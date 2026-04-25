import { MissingAuthenticatedUserError } from '../../errors/presentation/MissingAuthenticatedUserError';
import { HttpRequest } from '../types/HttpRequest';

export function getAuthenticatedUser(httpRequest: HttpRequest): { id: string; email: string } {
  const authUser = httpRequest.user;
  if (!authUser) {
    throw new MissingAuthenticatedUserError();
  }
  return authUser;
}
