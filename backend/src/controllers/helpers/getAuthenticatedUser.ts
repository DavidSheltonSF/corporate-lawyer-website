import { Request } from 'express';
import { MissingAuthenticatedUserError } from '../../errors/presentation/MissingAuthenticatedUserError';
import { AuthenticatedUser } from '../../types/AuthenticatedUser';

export function getAuthenticatedUser(req: Request): AuthenticatedUser {
  const authUser = req.user;
  if (!authUser) {
    throw new MissingAuthenticatedUserError();
  }
  return authUser;
}
