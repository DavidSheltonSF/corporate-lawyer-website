import { AuthController } from '../../controllers/auth/AuthController.js';
import { IAuthController } from '../../controllers/auth/IAuthController.js';
import { MongodbUserRepository } from '../../database/mongoDB/repositories/MongodbUserRepository.js';
import { AuthService } from '../../services/auth/AuthService.js';
import { IUserService } from '../../services/user/IUserService.js';

export function makeAuthController(userService: IUserService): IAuthController {
  const userRepository = new MongodbUserRepository();
  const authService = new AuthService(userRepository);
  return new AuthController(authService, userService);
}
