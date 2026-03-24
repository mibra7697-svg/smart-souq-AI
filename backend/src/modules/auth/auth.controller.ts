import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";

const service = new AuthService();

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await service.register(email, password);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const tokens = await service.login(email, password);
      res.json(tokens);
    } catch (err) {
      next(err);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      const tokens = await service.refresh(refreshToken);
      res.json(tokens);
    } catch (err) {
      next(err);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      const result = await service.logout(refreshToken);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async logoutAll(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new Error("User not authenticated");
      }
      const result = await service.logoutAll(userId);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async me(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId || req.user?.userId;
      if (!userId) {
        throw new Error("User not authenticated");
      }

      const user = await service.getProfile(userId);
      res.json({ success: true, user });
    } catch (err) {
      next(err);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId || req.user?.userId;
      if (!userId) {
        throw new Error("User not authenticated");
      }

      const updatedUser = await service.updateProfile(userId, req.body);
      res.json({ success: true, user: updatedUser });
    } catch (err) {
      next(err);
    }
  }
}
