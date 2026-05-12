import { INotificationService } from '../../services/notification/INotificationService';
import { EntityType } from '../../types/EntityType';
import { NotificationChannel } from '../../types/NotificationChannel';
import { NotificationType } from '../../types/NotificationType';
import { CaseEventPayload } from './CaseEvents';
import { EventListener } from '../EventListener';

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
