import { NotificationController } from '../../controllers/notification/NotificationController.js';
import { MongodbNotificationRepository } from '../../database/mongoDB/repositories/MongodbNotificationRepository.js';
import { NotificationService } from '../../services/notification/NotificationService.js';
import { INotificationsController } from '../../controllers/notification/INotificationController.js';

export function makeNotificationController(): INotificationsController {
  const notificationRepository = new MongodbNotificationRepository();
  const notificationService = new NotificationService(notificationRepository);
  return new NotificationController(notificationService);
}
