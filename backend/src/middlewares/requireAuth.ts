import { type NextFunction, type Request, type Response } from 'express';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).send({
        code: 'UNAUTHORIZED',
        message: 'Token missing',
      });
    }

    const decode = jwt.verify(token, 'secret');

    next();
  } catch (error: any) {
    if (error instanceof TokenExpiredError) {
      return res.status(401).send({
        code: 'UNAUTHORIZED',
        message: 'Token expired',
      });
    }

    if (error instanceof JsonWebTokenError) {
      return res.status(401).send({
        code: 'UNAUTHORIZED',
        message: 'Invalid token',
      });
    }

    console.log(error);
    return res.status(500).send({
      code: 'SERVER_ERROR',
      message: error,
    });
  }
}
