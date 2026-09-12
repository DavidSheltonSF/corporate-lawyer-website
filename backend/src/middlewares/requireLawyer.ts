import { NextFunction, Request, Response } from 'express';
import { ForbiddenError } from '../errors/presentation/ForbiddenError.js';
import { UserRole } from '../types/UserRole.js';
import { getAuthenticatedUser } from '../controllers/helpers/getAuthenticatedUser.js';

export function requireLawyer(req: Request, res: Response, next: NextFunction) {
  const authUser = getAuthenticatedUser(req);

  if (authUser.role !== UserRole.lawyer) {
    throw new ForbiddenError(
      `Could not execute operation. User with id '${authUser.id}' is not a lawyer but`
    );
  }

  next();
}
