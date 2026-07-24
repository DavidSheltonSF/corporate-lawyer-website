import { NextFunction, Request, Response } from 'express';
import { IUserService } from '../../services/user/IUserService';
import { getAuthenticatedUser } from '../../controllers/helpers/getAuthenticatedUser';
import { UnauthorizedError } from '../../errors/presentation/UnauthorizedError';

export function makeRequireUser(userService: IUserService) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authUser = getAuthenticatedUser(req);

    if (!(await userService.findById(authUser.id))) {
      throw new UnauthorizedError('User does not exist');
    }

    next();
  };
}
