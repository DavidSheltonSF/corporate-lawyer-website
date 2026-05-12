import { INotificationService } from '../services/notification/INotificationService';
import { CaseEvent } from './case/CaseEvents';
import { IEventBus } from './IEventBus';
import { NotifyCaseCreatedHandler } from './NofityCaseCreatedHandle';
import { NotifyCaseUpdatedHandler } from './case/NotifyCaseUpdatedHandler';
import { NotifyCaseDeletedHandler } from './case/NotifyCaseDeletedHandler';

export function registerCaseEvents(notificationService: INotificationService, eventBus: IEventBus) {
  const events = [
    { name: CaseEvent.CASE_CREATED, handler: new NotifyCaseCreatedHandler(notificationService) },
    { name: CaseEvent.CASE_UPDATED, handler: new NotifyCaseUpdatedHandler(notificationService) },
    { name: CaseEvent.CASE_DELETED, handler: new NotifyCaseDeletedHandler(notificationService) },
  ];
  events.forEach((event) => eventBus.subscribe(event.name, event.handler));
}
