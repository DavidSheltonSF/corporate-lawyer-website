import { NextFunction, Request, Response } from 'express';
import { getAuthenticatedUser } from '../../controllers/helpers/getAuthenticatedUser';
import { ForbiddenError } from '../../errors/presentation/ForbiddenError';
import { UserRole } from '../../types/UserRole';
import { IUserService } from '../../services/user/IUserService';

export function makeRequireLawyer(userService: IUserService) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authUser = getAuthenticatedUser(req);
    const { id } = authUser;

    const user = await userService.findById(id);
    if (!user) {
      throw new ForbiddenError(`Could not execute operation. User with id '${id}' was not found`);
    }

    if (user.role !== UserRole.lawyer) {
      throw new ForbiddenError(
        `Could not execute operation. User with id '${user.id}' is not a lawyer`
      );
    }
    next();
  };
}
