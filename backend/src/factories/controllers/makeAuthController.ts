import { AuthController } from '../../controllers/AuthController';
import { IAuthController } from '../../controllers/IAuthController';
import { MongodbUserRepository } from '../../database/MongodbUserRepository';
import { AuthService } from '../../services/auth/AuthService';
import { UserService } from '../../services/UserService';

export function makeAuthController(): IAuthController {
  const userRepository = new MongodbUserRepository();
  const userService = new UserService(userRepository);
  const authService = new AuthService(userRepository);
  return new AuthController(authService, userService);
}
