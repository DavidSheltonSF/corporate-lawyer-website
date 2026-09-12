import { INotificationService } from '../services/notification/INotificationService.js';
import { CaseEvent } from './case/CaseEvents.js';
import { IEventBus } from './IEventBus.js';
import { NotifyCaseCreatedHandler } from './case/NotifyCaseCreatedHandler.js';
import { NotifyCaseUpdatedHandler } from './case/NotifyCaseUpdatedHandler.js';
import { NotifyCaseDeletedHandler } from './case/NotifyCaseDeletedHandler.js';

export function registerCaseEvents(notificationService: INotificationService, eventBus: IEventBus) {
  const events = [
    { name: CaseEvent.CASE_CREATED, handler: new NotifyCaseCreatedHandler(notificationService) },
    { name: CaseEvent.CASE_UPDATED, handler: new NotifyCaseUpdatedHandler(notificationService) },
    { name: CaseEvent.CASE_DELETED, handler: new NotifyCaseDeletedHandler(notificationService) },
  ];
  events.forEach((event) => eventBus.subscribe(event.name, event.handler));
}
