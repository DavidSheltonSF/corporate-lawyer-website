import { UserController } from '../../controllers/user/UserController';
import { IUserController } from '../../controllers/user/IUserController';
import { MongodbUserRepository } from '../../database/mongoDB/repositories/MongodbUserRepository';
import { UserService } from '../../services/user/UserService';

export function makeUserController(): IUserController {
  const userRepository = new MongodbUserRepository();
  const userService = new UserService(userRepository);
  return new UserController(userService);
}
