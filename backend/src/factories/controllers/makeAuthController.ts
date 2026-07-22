import { AuthController } from '../../controllers/auth/AuthController';
import { IAuthController } from '../../controllers/auth/IAuthController';
import { MongodbCaseRepository } from '../../database/mongoDB/repositories/MongodbCaseRepository';
import { MongodbUserRepository } from '../../database/mongoDB/repositories/MongodbUserRepository';
import { AuthService } from '../../services/auth/AuthService';
import { IUserService } from '../../services/user/IUserService';

export function makeAuthController(userService: IUserService): IAuthController {
  const userRepository = new MongodbUserRepository();
  const authService = new AuthService(userRepository);
  return new AuthController(authService, userService);
}
