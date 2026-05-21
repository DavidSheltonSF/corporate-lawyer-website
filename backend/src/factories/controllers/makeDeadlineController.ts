import { DeadlineController } from '../../controllers/deadline/DeadlineController';
import { MongodbDeadlineRepository } from '../../database/mongoDB/repositories/MongodbDeadlineRepository';
import { DeadlineService } from '../../services/deadline/DeadlineService';
import { IDeadlineController } from '../../controllers/deadline/IDeadlineController';
import { MongodbCaseRepository } from '../../database/mongoDB/repositories/MongodbCaseRepository';
import { BrazilHolidaysProvider } from '../../services/BrazilHolidaysProvider';
import { MongodbUserRepository } from '../../database/mongoDB/repositories/MongodbUserRepository';
import { UserService } from '../../services/user/UserService';

export function makeDeadlineController(): IDeadlineController {
  const deadlineRepository = new MongodbDeadlineRepository();
  const caseRepository = new MongodbCaseRepository();
  const userRepository = new MongodbUserRepository();
  const userService = new UserService(userRepository, caseRepository);
  const holidaysProvider = new BrazilHolidaysProvider();
  const deadlineService = new DeadlineService(deadlineRepository, caseRepository, holidaysProvider);
  return new DeadlineController(deadlineService, userService);
}
