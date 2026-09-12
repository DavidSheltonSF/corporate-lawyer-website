import { INotificationService } from '../../services/notification/INotificationService.js';
import { EntityType } from '../../types/EntityType.js';
import { NotificationChannel } from '../../types/NotificationChannel.js';
import { NotificationType } from '../../types/NotificationType.js';
import { CaseEventPayload } from './CaseEvents.js';
import { EventListener } from '../EventListener.js';

export class NotifyCaseDeletedHandler implements EventListener {
  constructor(private readonly notificationService: INotificationService) {}

  async handle(payload: CaseEventPayload) {
    const { clientId, lawyerId, caseId, caseTitle } = payload;

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
      if (result.status === 'rejected') {
        console.log('Notification failed', result.reason);
      }
    });
  }
}
