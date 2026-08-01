import { MissingAuthenticatedUserError } from '../../errors/presentation/MissingAuthenticatedUserError';
import { AuthenticatedUser } from '../../types/AuthenticatedUser';
import { HttpRequest } from '../types/HttpRequest';

export function requireAuthenticatedUser(httpRequest: HttpRequest): AuthenticatedUser {
  const user = httpRequest.user;
  if (!user) {
    throw new MissingAuthenticatedUserError();
  }
  return user;
}
