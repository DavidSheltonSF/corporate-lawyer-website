import { CaseController } from '../../controllers/case/CaseController';
import { ICaseController } from '../../controllers/case/ICaseController';
import { MongodbCaseRepository } from '../../database/mongoDB/repositories/MongodbCaseRepository';
import { MongodbNotificationRepository } from '../../database/mongoDB/repositories/MongodbNotificationRepository';
import { MongodbUserRepository } from '../../database/mongoDB/repositories/MongodbUserRepository';
import { CaseCreateHandler } from '../../events/case/CaseCreateHandler';
import { EventBus } from '../../events/EventBust';
import { CaseService } from '../../services/case/CaseService';
import { NotificationService } from '../../services/notification/NotificationService';
import { UserService } from '../../services/user/UserService';

export function makeCaseController(): ICaseController {
  const eventBus = new EventBus();
  const notificationRepository = new MongodbNotificationRepository()
  const notificationService = new NotificationService(notificationRepository)
  const caseCreatedHandler = new CaseCreateHandler(notificationService)
  caseCreatedHandler.register(eventBus)
  const caseRepository = new MongodbCaseRepository();
  const caseService = new CaseService(caseRepository, eventBus);
  const userRepository = new MongodbUserRepository();
  const userService = new UserService(userRepository, caseRepository);
  return new CaseController(caseService, userService);
}
