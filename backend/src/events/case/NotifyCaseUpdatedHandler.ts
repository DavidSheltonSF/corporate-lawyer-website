import { INotificationService } from '../../services/notification/INotificationService';
import { EntityType } from '../../types/EntityType';
import { NotificationChannel } from '../../types/NotificationChannel';
import { NotificationType } from '../../types/NotificationType';
import { CaseEventPayload } from './CaseEvents';
import { EventListener } from '../EventListener';

export class NotifyCaseUpdatedHandler implements EventListener {
  constructor(private readonly notificationService: INotificationService) {}

  async handle(payload: CaseEventPayload) {
    const { clientId, lawyerId, caseId, caseTitle } = payload;

    const promises = [
      this.notificationService.create({
        userId: clientId,
        channels: [NotificationChannel.IN_APP],
        type: NotificationType.UPDATED,
        title: 'Processo atualizado',
        message: `Processo "${caseTitle}" foi atualizado`,
        metadata: {
          entityType: EntityType.CASE,
          entityId: caseId,
        },
      }),

      this.notificationService.create({
        userId: lawyerId,
        channels: [NotificationChannel.IN_APP],
        type: NotificationType.UPDATED,
        title: 'Processo atualizado',
        message: `Processo "${caseTitle}" foi atualizado`,
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
