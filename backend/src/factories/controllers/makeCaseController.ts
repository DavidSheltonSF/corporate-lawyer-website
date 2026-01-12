import { CaseController } from '../../controllers/case/CaseController';
import { ICaseController } from '../../controllers/case/ICaseController';
import { MongodbCaseRepository } from '../../database/MongodbCaseRepository';
import { MongodbUserRepository } from '../../database/MongodbUserRepository';
import { CaseService } from '../../services/case/CaseService';
import { UserService } from '../../services/user/UserService';

export function makeCaseController(): ICaseController {
  const caseRepository = new MongodbCaseRepository();
  const caseService = new CaseService(caseRepository);
  const userRepository = new MongodbUserRepository();
  const userService = new UserService(userRepository);
  return new CaseController(caseService, userService);
}
