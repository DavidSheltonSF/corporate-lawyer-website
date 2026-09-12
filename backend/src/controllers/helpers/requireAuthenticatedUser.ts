import { MissingAuthenticatedUserError } from '../../errors/presentation/MissingAuthenticatedUserError.js';
import { AuthenticatedUser } from '../../types/AuthenticatedUser.js';
import { HttpRequest } from '../types/HttpRequest.js';

export function requireAuthenticatedUser(httpRequest: HttpRequest): AuthenticatedUser {
  const user = httpRequest.user;
  if (!user) {
    throw new MissingAuthenticatedUserError();
  }
  return user;
}
