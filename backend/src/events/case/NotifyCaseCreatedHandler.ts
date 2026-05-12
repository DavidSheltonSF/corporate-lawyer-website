import { INotificationService } from '../../services/notification/INotificationService';
import { EntityType } from '../../types/EntityType';
import { NotificationChannel } from '../../types/NotificationChannel';
import { NotificationType } from '../../types/NotificationType';
import { EventBus } from '../EventBust';
import { CaseEvent, CaseEventPayload } from './CaseEvents';

export class NotifyCaseCreatedHandler {
  constructor(private readonly notificationService: INotificationService) {}

  register(eventBus: EventBus) {
    eventBus.on<CaseEventPayload>(CaseEvent.CASE_CREATED, async (event) => {
      const { clientId, lawyerId, caseId, caseTitle } = event;

      const promises = [
        this.notificationService.create({
          userId: clientId,
          channels: [NotificationChannel.IN_APP],
          type: NotificationType.CREATED,
          title: 'Novo processo cadastrado',
          message: `Processo "${caseTitle}" cadastrado com sucesso`,
          metadata: {
            entityType: EntityType.CASE,
            entityId: caseId,
          },
        }),

        this.notificationService.create({
          userId: lawyerId,
          channels: [NotificationChannel.IN_APP],
          type: NotificationType.CREATED,
          title: 'Novo processo cadastrado',
          message: `Processo "${caseTitle}" cadastrado com sucesso`,
          metadata: {
            entityType: EntityType.CASE,
            entityId: caseId,
          },
        }),
      ];

      const result = await Promise.allSettled(promises);

      result.forEach((result) => {
        if (result.status === 'rejected') {
          console.log('Notification failed', result.reason);
        }
      });
    });
  }
}
