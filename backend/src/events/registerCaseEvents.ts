import { INotificationService } from '../services/notification/INotificationService';
import { NotifyCaseCreatedHandler } from './case/NotifyCaseCreatedHandler';
import { CaseDeleteHandler } from './case/NotifyCaseDeletedHandler';
import { NotifyCaseUpdatedHandler } from './case/NotifyCaseUpdatedHandler';
import { EventBus } from './EventBust';

export function registerCaseEvents(notificationService: INotificationService) {
  const eventBus = new EventBus();
  const handlers = [
    new NotifyCaseCreatedHandler(notificationService),
    new NotifyCaseUpdatedHandler(notificationService),
    new CaseDeleteHandler(notificationService),
  ];
  handlers.forEach((handler) => handler.register(eventBus));
}
