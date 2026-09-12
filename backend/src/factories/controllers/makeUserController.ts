import { UserController } from '../../controllers/user/UserController.js';
import { IUserController } from '../../controllers/user/IUserController.js';
import { IUserService } from '../../services/user/IUserService.js';

export function makeUserController(userService: IUserService): IUserController {
  return new UserController(userService);
}
