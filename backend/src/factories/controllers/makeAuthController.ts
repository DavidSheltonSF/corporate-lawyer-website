import { AuthController } from '../../controllers/auth/AuthController';
import { IAuthController } from '../../controllers/auth/IAuthController';
import { MongodbCaseRepository } from '../../database/mongoDB/repositories/MongodbCaseRepository';
import { MongodbUserRepository } from '../../database/mongoDB/repositories/MongodbUserRepository';
import { AuthService } from '../../services/auth/AuthService';
import { UserService } from '../../services/user/UserService';

export function makeAuthController(): IAuthController {
  const userRepository = new MongodbUserRepository();
  const caseRepository = new MongodbCaseRepository();
  const userService = new UserService(userRepository, caseRepository);
  const authService = new AuthService(userRepository);
  return new AuthController(authService, userService);
}
