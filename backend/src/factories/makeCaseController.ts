import { CaseController } from '../controllers/case.controller';
import { ICaseController } from '../controllers/ICaseController';
import { MongodbCaseRepository } from '../database/MongodbCaseRepository';
import { MongodbUserRepository } from '../database/MongodbUserRepository';
import { CaseService } from '../services/case.service';
import { UserService } from '../services/user.service';

export function makeCaseController(): ICaseController {
  const caseRepository = new MongodbCaseRepository();
  const caseService = new CaseService(caseRepository);
  const userRepository = new MongodbUserRepository();
  const userService = new UserService(userRepository);
  return new CaseController(caseService, userService);
}
