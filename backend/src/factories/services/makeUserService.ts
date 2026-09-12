import { MongodbCaseRepository } from '../../database/mongoDB/repositories/MongodbCaseRepository.js';
import { MongodbUserRepository } from '../../database/mongoDB/repositories/MongodbUserRepository.js';
import { UserService } from '../../services/user/UserService.js';

export function makeUserService() {
  const userRepository = new MongodbUserRepository();
  const caseRepository = new MongodbCaseRepository();
  return new UserService(userRepository, caseRepository);
}
