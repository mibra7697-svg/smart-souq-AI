import { Request, Response, NextFunction } from 'express';
import { prisma } from '../prisma/client';

interface FailedLoginAttempt {
  email: string;
  attempts: number;
  lastAttempt: Date;
  lockedUntil?: Date;
}

// In-memory store for failed attempts (in production, use Redis)
const failedAttempts = new Map<string, FailedLoginAttempt>();

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes
const ATTEMPT_WINDOW = 5 * 60 * 1000; // 5 minutes

export const accountLockoutMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  if (!email) {
    return next();
  }

  const now = new Date();
  const attempt = failedAttempts.get(email);

  // Check if account is locked
  if (attempt && attempt.lockedUntil && attempt.lockedUntil > now) {
    const remainingTime = Math.ceil((attempt.lockedUntil.getTime() - now.getTime()) / 60000);
    return res.status(429).json({
      success: false,
      message: `Account temporarily locked. Try again in ${remainingTime} minutes.`,
      lockedUntil: attempt.lockedUntil,
      remainingMinutes: remainingTime
    });
  }

  // Clean up old attempts
  if (attempt && now.getTime() - attempt.lastAttempt.getTime() > ATTEMPT_WINDOW) {
    failedAttempts.delete(email);
  }

  next();
};

export const recordFailedLogin = (email: string) => {
  const now = new Date();
  const attempt = failedAttempts.get(email) || {
    email,
    attempts: 0,
    lastAttempt: now
  };

  attempt.attempts += 1;
  attempt.lastAttempt = now;

  // Lock account if max attempts reached
  if (attempt.attempts >= MAX_ATTEMPTS) {
    attempt.lockedUntil = new Date(now.getTime() + LOCKOUT_DURATION);
  }

  failedAttempts.set(email, attempt);
};

export const recordSuccessfulLogin = (email: string) => {
  failedAttempts.delete(email);
};

export const getAccountStatus = (email: string) => {
  const attempt = failedAttempts.get(email);
  if (!attempt) return { locked: false };

  const now = new Date();
  const isLocked = attempt.lockedUntil && attempt.lockedUntil > now;

  return {
    locked: isLocked,
    attempts: attempt.attempts,
    lastAttempt: attempt.lastAttempt,
    lockedUntil: attempt.lockedUntil,
    remainingTime: isLocked ? Math.ceil((attempt.lockedUntil!.getTime() - now.getTime()) / 60000) : 0
  };
};
