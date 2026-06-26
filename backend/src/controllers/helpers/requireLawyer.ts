import { ForbiddenError } from '../../errors/presentation/ForbiddenError';
import { IUserService } from '../../services/user/IUserService';
import { UserRole } from '../../types/UserRole';
import { HttpRequest } from '../types/HttpRequest';
import { getAuthenticatedUser } from './getAuthenticatedUser';

export async function requireLawyer(httpRequest: HttpRequest, userService: IUserService) {
  const authUser = getAuthenticatedUser(httpRequest);
  const { id } = authUser;

  const authUserData = await userService.findById(id);
  if (!authUserData) {
    throw new ForbiddenError(`Could not execute operation. User with id '${id}' was not found`);
  }

  if (authUserData.role !== UserRole.lawyer) {
    throw new ForbiddenError(
      `Could not execute operation. User with id '${authUserData.id}' is not a lawyer`
    );
  }
}
