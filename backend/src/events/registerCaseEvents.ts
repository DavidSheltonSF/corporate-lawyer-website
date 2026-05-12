import { INotificationService } from '../services/notification/INotificationService';
import { CaseCreateHandler } from './case/CaseCreateHandler';
import { CaseDeleteHandler } from './case/CaseDeleteHandler';
import { CaseUpdateHandler } from './case/CaseUpdateHandler';
import { EventBus } from './EventBust';

export function registerCaseEvents(notificationService: INotificationService) {
  const eventBus = new EventBus();
  const handlers = [
    new CaseCreateHandler(notificationService),
    new CaseUpdateHandler(notificationService),
    new CaseDeleteHandler(notificationService),
  ];
  handlers.forEach((handler) => handler.register(eventBus));
}
