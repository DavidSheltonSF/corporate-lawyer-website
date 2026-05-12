import { INotificationService } from '../../services/notification/INotificationService';
import { EntityType } from '../../types/EntityType';
import { NotificationChannel } from '../../types/NotificationChannel';
import { NotificationType } from '../../types/NotificationType';
import { EventBus } from '../EventBust';
import { CaseEvent, CaseEventPayload } from './CaseEvents';

export class CaseDeleteHandler {
  constructor(private readonly notificationService: INotificationService) {}

  register(eventBus: EventBus) {
    eventBus.on<CaseEventPayload>(CaseEvent.CASE_DELETED, async (event) => {
      const { caseId, caseTitle, clientId, lawyerId } = event;

      const promises = [
        this.notificationService.create({
          userId: clientId,
          title: `Processo deletado pelo advogado`,
          channels: [NotificationChannel.IN_APP],
          type: NotificationType.DELETED,
          message: `Processo "${caseTitle}" foi deletado`,
          metadata: {
            entityType: EntityType.CASE,
            entityId: caseId,
          },
        }),
        this.notificationService.create({
          userId: lawyerId,
          title: `Processo deletado com sucesso`,
          channels: [NotificationChannel.IN_APP],
          type: NotificationType.DELETED,
          message: `Processo "${caseTitle}" foi deletado com sucesso`,
          metadata: {
            entityType: EntityType.CASE,
            entityId: caseId,
          },
        }),
      ];

      const result = await Promise.allSettled(promises);

      result.forEach((result) => {
        if(result.status === 'rejected') {
          console.log('Notification falled', result.reason)
        }
      })
    });
  }
}
