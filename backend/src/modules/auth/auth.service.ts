import prisma from "../../core/prisma/client";
import { AppError } from "../../core/errors/AppError";
import { hashPassword, comparePassword } from "../../core/utils/hash";
import { generateAccessToken, generateRefreshToken } from "../../core/utils/jwt";
import { recordFailedLogin, recordSuccessfulLogin } from "../../core/middleware/accountLockout";
import { PublicKey } from "@solana/web3.js";

type PayoutPreference = "BANK" | "SOLANA";

interface UpdateProfileInput {
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  solanaAddress?: string | null;
  payoutPreference?: PayoutPreference;
}

export class AuthService {
  async register(email: string, password: string) {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new AppError("Invalid email format", 400);
    }

    // Validate password strength
    if (password.length < 8) {
      throw new AppError("Password must be at least 8 characters long", 400);
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      throw new AppError("Password must contain uppercase, lowercase letters and numbers", 400);
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) throw new AppError("Email already exists", 400);

    const hashed = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        username: email.split('@')[0], // Generate username from email
      }
    });

    return user;
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      recordFailedLogin(email);
      throw new AppError("Invalid credentials", 401);
    }

    const valid = await comparePassword(password, user.password);
    if (!valid) {
      recordFailedLogin(email);
      throw new AppError("Invalid credentials", 401);
    }

    // Record successful login and clear failed attempts
    recordSuccessfulLogin(email);

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now

    await prisma.refreshToken.create({
      data: { 
        token: refreshToken, 
        userId: user.id,
        expiresAt: expiresAt
      }
    });

    return { accessToken, refreshToken };
  }

  async refresh(token: string) {
    const stored = await prisma.refreshToken.findUnique({ where: { token } });
    if (!stored) throw new AppError("Invalid refresh token", 401);
    
    // Check expiration
    if (stored.expiresAt < new Date()) {
      await prisma.refreshToken.delete({ where: { token } });
      throw new AppError("Refresh token expired", 401);
    }

    const payload = generateAccessToken(stored.userId);
    const newRefresh = generateRefreshToken(stored.userId);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Delete old refresh token (rotation)
    await prisma.refreshToken.delete({ where: { token } });
    await prisma.refreshToken.create({
      data: { 
        token: newRefresh, 
        userId: stored.userId,
        expiresAt: expiresAt
      }
    });

    return { accessToken: payload, refreshToken: newRefresh };
  }

  async logout(token: string) {
    try {
      await prisma.refreshToken.delete({ where: { token } });
      return { message: "Logged out" };
    } catch (error) {
      // Token might already be invalid/expired
      return { message: "Logged out" };
    }
  }

  async logoutAll(userId: string) {
    try {
      await prisma.refreshToken.deleteMany({ where: { userId } });
      return { message: "Logged out from all devices" };
    } catch (error) {
      throw new AppError("Failed to logout from all devices", 500);
    }
  }

  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        name: true,
        role: true,
        isActive: true,
        solanaAddress: true,
        payoutPreference: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }

  async updateProfile(userId: string, payload: UpdateProfileInput) {
    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        solanaAddress: true,
        payoutPreference: true
      }
    });

    if (!currentUser) {
      throw new AppError("User not found", 404);
    }

    const updateData: UpdateProfileInput = {};

    if (typeof payload.firstName !== "undefined") updateData.firstName = payload.firstName;
    if (typeof payload.lastName !== "undefined") updateData.lastName = payload.lastName;
    if (typeof payload.name !== "undefined") updateData.name = payload.name;
    if (typeof payload.email !== "undefined") updateData.email = payload.email;

    if (typeof payload.solanaAddress !== "undefined") {
      if (payload.solanaAddress === null || payload.solanaAddress.trim() === "") {
        updateData.solanaAddress = null;
      } else {
        let publicKey: PublicKey;
        try {
          publicKey = new PublicKey(payload.solanaAddress);
        } catch (_error) {
          throw new AppError("Invalid Solana address format", 400);
        }

        if (!PublicKey.isOnCurve(publicKey.toBytes())) {
          throw new AppError("Solana address is not on curve", 400);
        }

        updateData.solanaAddress = publicKey.toBase58();
      }
    }

    const targetPayoutPreference = payload.payoutPreference ?? currentUser.payoutPreference;
    const targetSolanaAddress =
      typeof updateData.solanaAddress !== "undefined" ? updateData.solanaAddress : currentUser.solanaAddress;

    if (targetPayoutPreference === "SOLANA" && !targetSolanaAddress) {
      throw new AppError("Solana address is required when payout preference is SOLANA", 400);
    }

    if (typeof payload.payoutPreference !== "undefined") {
      updateData.payoutPreference = payload.payoutPreference;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        name: true,
        role: true,
        isActive: true,
        solanaAddress: true,
        payoutPreference: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return updatedUser;
  }
}
