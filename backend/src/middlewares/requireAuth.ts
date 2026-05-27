import { type NextFunction, type Request, type Response } from 'express';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { JwtPayload } from '../types/JwtPayload';
import dotenv from 'dotenv';
import { HttpResponseFactory } from '../factories/HttpResponse/HttpResponseFactory';
import { UnauthorizedError } from '../errors/presentation/UnauthorizedError';

dotenv.config();

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      console.log('Missing session token');
      return res.status(401).send(HttpResponseFactory.makeUnauthorized('Missing session token'));
    }

    const API_SECRET = process.env.API_SECRET;

    if (API_SECRET === undefined) {
      console.log('API Secret not found');
      throw Error('API Secret not found');
    }

    const payload = jwt.verify(token, API_SECRET) as JwtPayload;

    req.user = {
      id: payload.sub,
      email: payload.email,
    };

    next();
  } catch (error: any) {
    console.log(error);
    if (error instanceof TokenExpiredError) {
      throw new UnauthorizedError('Token expired');
    }

    if (error instanceof JsonWebTokenError) {
      throw new UnauthorizedError('Invalid token');
    }

    throw error;
  }
}
