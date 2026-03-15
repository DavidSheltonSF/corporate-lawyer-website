import { UserController } from '../../controllers/user/UserController';
import { IUserController } from '../../controllers/user/IUserController';
import { MongodbUserRepository } from '../../database/mongoDB/repositories/MongodbUserRepository';
import { UserService } from '../../services/user/UserService';
import { MongodbCaseRepository } from '../../database/mongoDB/repositories/MongodbCaseRepository';

export function makeUserController(): IUserController {
  const userRepository = new MongodbUserRepository();
  const caseRepository = new MongodbCaseRepository();
  const userService = new UserService(userRepository, caseRepository);
  return new UserController(userService);
}
