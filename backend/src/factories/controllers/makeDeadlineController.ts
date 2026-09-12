import { DeadlineController } from '../../controllers/deadline/DeadlineController.js';
import { MongodbDeadlineRepository } from '../../database/mongoDB/repositories/MongodbDeadlineRepository.js';
import { DeadlineService } from '../../services/deadline/DeadlineService.js';
import { IDeadlineController } from '../../controllers/deadline/IDeadlineController.js';
import { MongodbCaseRepository } from '../../database/mongoDB/repositories/MongodbCaseRepository.js';
import { BrazilHolidaysProvider } from '../../services/BrazilHolidaysProvider.js';

export function makeDeadlineController(): IDeadlineController {
  const deadlineRepository = new MongodbDeadlineRepository();
  const caseRepository = new MongodbCaseRepository();
  const holidaysProvider = new BrazilHolidaysProvider();
  const deadlineService = new DeadlineService(deadlineRepository, caseRepository, holidaysProvider);
  return new DeadlineController(deadlineService);
}
