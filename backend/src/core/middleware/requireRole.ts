import { Request, Response, NextFunction } from 'express';
import { prisma } from '../prisma/client';
import { AppError } from '../errors/AppError';

export const requireRole = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.userId;
      
      if (!userId) {
        throw new AppError('Authentication required', 401);
      }

      // Fetch user from database to get their role
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { role: true }
      });

      if (!user) {
        throw new AppError('User not found', 404);
      }

      // Check if user has required role
      if (!roles.includes(user.role)) {
        throw new AppError('Insufficient permissions', 403);
      }

      next();
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ 
          error: error.message 
        });
      }
      
      return res.status(500).json({ 
        error: 'Internal server error' 
      });
    }
  };
};