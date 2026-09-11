import { DeadlineController } from '../../controllers/deadline/DeadlineController';
import { MongodbDeadlineRepository } from '../../database/mongoDB/repositories/MongodbDeadlineRepository';
import { DeadlineService } from '../../services/deadline/DeadlineService';
import { IDeadlineController } from '../../controllers/deadline/IDeadlineController';
import { MongodbCaseRepository } from '../../database/mongoDB/repositories/MongodbCaseRepository';
import { BrazilHolidaysProvider } from '../../services/BrazilHolidaysProvider';

export function makeDeadlineController(): IDeadlineController {
  const deadlineRepository = new MongodbDeadlineRepository();
  const caseRepository = new MongodbCaseRepository();
  const holidaysProvider = new BrazilHolidaysProvider();
  const deadlineService = new DeadlineService(deadlineRepository, caseRepository, holidaysProvider);
  return new DeadlineController(deadlineService);
}
