import { AuthController } from '../controllers/auth.controller';
import { IAuthController } from '../controllers/IAuthController';
import { MongodbUserRepository } from '../database/MongodbUserRepository';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

export function makeAuthController(): IAuthController {
  const userRepository = new MongodbUserRepository();
  const userService = new UserService(userRepository);
  const authService = new AuthService(userRepository);
  return new AuthController(authService, userService);
}
