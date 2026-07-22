import { CaseController } from '../../controllers/case/CaseController';
import { ICaseController } from '../../controllers/case/ICaseController';
import { MongodbCaseRepository } from '../../database/mongoDB/repositories/MongodbCaseRepository';
import { MongodbFileRepository } from '../../database/mongoDB/repositories/MongodbFileRepository';
import { MongodbNotificationRepository } from '../../database/mongoDB/repositories/MongodbNotificationRepository';
import { InMemoryEventBus } from '../../events/InMemoryEventBus';
import { registerCaseEvents } from '../../events/registerCaseEvents';
import { CaseService } from '../../services/case/CaseService';
import { FileService } from '../../services/files/FileService';
import { NotificationService } from '../../services/notification/NotificationService';
import { IUserService } from '../../services/user/IUserService';
import { CloudinaryUploadService } from '../../services/uṕload/CloudinaryUploadService';

export function makeCaseController(userService: IUserService): ICaseController {
  const eventBus = new InMemoryEventBus();
  const notificationRepository = new MongodbNotificationRepository();
  const notificationService = new NotificationService(notificationRepository);
  registerCaseEvents(notificationService, eventBus);

  const caseRepository = new MongodbCaseRepository();
  const fileRepository = new MongodbFileRepository();
  const caseService = new CaseService(caseRepository, eventBus);
  const uploadService = new CloudinaryUploadService();
  const fileService = new FileService(fileRepository, uploadService);

  return new CaseController(caseService, fileService, userService);
}
