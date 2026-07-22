import { MongodbCaseRepository } from '../../database/mongoDB/repositories/MongodbCaseRepository';
import { MongodbUserRepository } from '../../database/mongoDB/repositories/MongodbUserRepository';
import { UserService } from '../../services/user/UserService';

export function makeUserService() {
  const userRepository = new MongodbUserRepository();
  const caseRepository = new MongodbCaseRepository();
  return new UserService(userRepository, caseRepository);
}
