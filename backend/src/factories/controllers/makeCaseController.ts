import { CaseController } from '../../controllers/case/CaseController.js';
import { ICaseController } from '../../controllers/case/ICaseController.js';
import { MongodbCaseRepository } from '../../database/mongoDB/repositories/MongodbCaseRepository.js';
import { MongodbFileRepository } from '../../database/mongoDB/repositories/MongodbFileRepository.js';
import { MongodbNotificationRepository } from '../../database/mongoDB/repositories/MongodbNotificationRepository.js';
import { InMemoryEventBus } from '../../events/InMemoryEventBus.js';
import { registerCaseEvents } from '../../events/registerCaseEvents.js';
import { CaseService } from '../../services/case/CaseService.js';
import { FileService } from '../../services/files/FileService.js';
import { NotificationService } from '../../services/notification/NotificationService.js';
import { CloudinaryUploadService } from '../../services/uṕload/CloudinaryUploadService.js';

export function makeCaseController(): ICaseController {
  const eventBus = new InMemoryEventBus();
  const notificationRepository = new MongodbNotificationRepository();
  const notificationService = new NotificationService(notificationRepository);
  registerCaseEvents(notificationService, eventBus);

  const caseRepository = new MongodbCaseRepository();
  const fileRepository = new MongodbFileRepository();
  const caseService = new CaseService(caseRepository, eventBus);
  const uploadService = new CloudinaryUploadService();
  const fileService = new FileService(fileRepository, uploadService);

  return new CaseController(caseService, fileService);
}
