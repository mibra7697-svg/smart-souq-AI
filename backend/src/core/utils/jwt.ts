import jwt from 'jsonwebtoken';
import { AppError } from '../errors/AppError';

const SECRET = process.env.JWT_SECRET;
if (!SECRET) {
  throw new AppError('JWT_SECRET is not defined in environment variables', 500);
}

export const generateToken = (payload: any): string => {
  return jwt.sign(payload, SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    algorithm: 'HS256',
    issuer: 'smartsouq-api',
  } as jwt.SignOptions);
};

export const generateAccessToken = (userId: string): string => {
  return generateToken({ userId, type: 'access' });
};

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ userId, type: 'refresh' }, SECRET as string, {
    expiresIn: '30d',
    algorithm: 'HS256',
    issuer: 'smartsouq-api',
  } as jwt.SignOptions);
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, SECRET, {
      algorithms: ['HS256'],
      issuer: 'smartsouq-api',
    });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AppError('Token expired', 401);
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AppError('Invalid token', 401);
    }
    throw new AppError('Token verification failed', 401);
  }
};
