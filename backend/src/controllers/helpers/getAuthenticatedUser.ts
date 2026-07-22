import { Request } from 'express';
import { MissingAuthenticatedUserError } from '../../errors/presentation/MissingAuthenticatedUserError';

export function getAuthenticatedUser(req: Request): { id: string; email: string } {
  const authUser = req.user;
  if (!authUser) {
    throw new MissingAuthenticatedUserError();
  }
  return authUser;
}
