import { UserController } from '../../controllers/user/UserController';
import { IUserController } from '../../controllers/user/IUserController';
import { IUserService } from '../../services/user/IUserService';

export function makeUserController(userService: IUserService): IUserController {
  return new UserController(userService);
}
