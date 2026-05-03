import { INotificationService } from '../../services/notification/INotificationService';
import { NotificationChannel } from '../../types/NotificationChannel';
import { NotificationType } from '../../types/NotificationType';
import { EventBus } from '../EventBust';
import { CASE_CREATED, CaseCreatedEvent } from './CaseEvents';

export class CaseCreateHandler {
  constructor(private readonly notificationService: INotificationService) {}

  register(eventBus: EventBus) {
    eventBus.on<CaseCreatedEvent>(CASE_CREATED, async (event) => {
      const { clientId, lawyerId, caseId, caseTitle } = event;

      const promises = [
        this.notificationService.create({
          userId: clientId,
          channels: [NotificationChannel.IN_APP],
          type: NotificationType.CASE_CREATED,
          title: 'Novo processo cadastrado',
          message: `Processo "${caseTitle}" cadastrado com sucesso`,
          metadata: {
            caseId,
          },
        }),

        this.notificationService.create({
          userId: lawyerId,
          channels: [NotificationChannel.IN_APP],
          type: NotificationType.CASE_CREATED,
          title: 'Novo processo cadastrado',
          message: `Processo "${caseTitle}" cadastrado com sucesso`,
          metadata: {
            caseId,
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
