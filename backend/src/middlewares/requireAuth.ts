import { type NextFunction, type Request, type Response } from 'express';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { AuthenticatedUser } from '../types/AuthenticatedUser';
import { JwtPayload } from '../types/JwtPayload';
import dotenv from 'dotenv';
import { HttpResponseFactory } from '../factories/HttpResponse/HttpResponseFactory';

dotenv.config();

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(401)
        .send(HttpResponseFactory.makeUnouthorized({ message: 'Token missing' }));
    }

    const API_SECRET = process.env.API_SECRET;

    if (API_SECRET === undefined) {
      throw Error('API Secret not found');
    }

    const decode = jwt.verify(token, API_SECRET) as JwtPayload;

    const authReq = req as Request & AuthenticatedUser;

    authReq.user = {
      id: decode.sub,
      email: decode.email,
    };

    next();
  } catch (error: any) {
    if (error instanceof TokenExpiredError) {
      return res
        .status(401)
        .send(HttpResponseFactory.makeUnouthorized({ message: 'Token expired' }));
    }

    if (error instanceof JsonWebTokenError) {
      return res
        .status(401)
        .send(HttpResponseFactory.makeUnouthorized({ message: 'Invalid token' }));
    }

    console.log(error);
    return res.status(500).send(HttpResponseFactory.makeServerError({ message: error }));
  }
}
