import { NextFunction, Request, Response } from 'express';
import { IUserService } from '../../services/user/IUserService';
import { getAuthenticatedUser } from '../../controllers/helpers/getAuthenticatedUser';
import { UnauthorizedError } from '../../errors/presentation/UnauthorizedError';

export function makeRequireUser(userService: IUserService) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authUser = getAuthenticatedUser(req);
    const existingUser = await userService.findById(authUser.id);
    if (!existingUser) {
      throw new UnauthorizedError('User does not exist');
    }

    req.user = {
      id: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
    };
    next();
  };
}
