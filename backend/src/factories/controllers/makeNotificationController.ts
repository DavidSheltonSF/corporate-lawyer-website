import { NotificationController } from '../../controllers/notification/NotificationController';
import { MongodbNotificationRepository } from '../../database/mongoDB/repositories/MongodbNotificationRepository';
import { NotificationService } from '../../services/notification/NotificationService';
import { INotificationsController } from '../../controllers/notification/INotificationController';

export function makeNotificationController(): INotificationsController {
  const notificationRepository = new MongodbNotificationRepository();
  const notificationService = new NotificationService(notificationRepository);
  return new NotificationController(notificationService);
}
