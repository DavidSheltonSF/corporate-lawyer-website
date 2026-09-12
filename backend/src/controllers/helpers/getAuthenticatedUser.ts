import { Request } from 'express';
import { MissingAuthenticatedUserError } from '../../errors/presentation/MissingAuthenticatedUserError.js';
import { AuthenticatedUser } from '../../types/AuthenticatedUser.js';

export function getAuthenticatedUser(req: Request): AuthenticatedUser {
  const authUser = req.user;
  if (!authUser) {
    throw new MissingAuthenticatedUserError();
  }
  return authUser;
}
