import { type NextFunction, type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/JwtPayload.js';
import dotenv from 'dotenv';
import { UnauthorizedError } from '../errors/presentation/UnauthorizedError.js';

dotenv.config();

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      console.log('Missing session token');
      throw new UnauthorizedError('Missing session token');
    }

    const API_SECRET = process.env.API_SECRET;

    if (API_SECRET === undefined) {
      console.log('API Secret not found');
      throw Error('API Secret not found');
    }

    const payload = jwt.verify(token, API_SECRET) as JwtPayload;

    if (!payload.sub || !payload.email) {
      throw new UnauthorizedError('Invalid token: Missing user id or email');
    }

    req.user = {
      id: payload.sub,
      email: payload.email,
    };

    next();
  } catch (error: any) {
    console.log(error);
    if (error instanceof jwt.TokenExpiredError) {
      throw new UnauthorizedError('Token expired');
    }

    if (error instanceof jwt.JsonWebTokenError) {
      throw new UnauthorizedError('Invalid token');
    }

    throw error;
  }
}
