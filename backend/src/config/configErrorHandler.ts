import { Application, NextFunction, Request, Response } from 'express';
import { DomainError } from '../errors/domain/DomainError';
import { BaseHttpError } from '../errors/presentation/BaseHttpError';

export function configErrorHandler(app: Application) {
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    if (err instanceof BaseHttpError) {
      return res
        .status(err.statusCode)
        .json({ message: err.message, code: err.code, details: err.details });
    }

    if (err instanceof DomainError) {
      return res.status(422).json({ message: err.message, code: 'DOMAIN_ERROR' });
    }

    return res.status(500).json({ message: 'Internal server error' });
  });
}
