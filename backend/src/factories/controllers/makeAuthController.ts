import { AuthController } from '../../controllers/auth/AuthController';
import { IAuthController } from '../../controllers/auth/IAuthController';
import { MongodbUserRepository } from '../../database/repositories/MongodbUserRepository';
import { AuthService } from '../../services/auth/AuthService';
import { UserService } from '../../services/user/UserService';

export function makeAuthController(): IAuthController {
  const userRepository = new MongodbUserRepository();
  const userService = new UserService(userRepository);
  const authService = new AuthService(userRepository);
  return new AuthController(authService, userService);
}
