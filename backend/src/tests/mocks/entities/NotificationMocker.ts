import { CreateNotificationDTO } from '../../../dtos/notification/CreateNotificationDTO.js';
import { NotificationDTO } from '../../../dtos/notification/NotificationDTO.js';
import { NotificationChannel } from '../../../types/NotificationChannel.js';
import { NotificationType } from '../../../types/NotificationType.js';
import { WithId } from '../../../types/WithId.js';
import { GenericMocker } from '../fields/GenericMocker.js';
import { NotificationFieldsMocker } from '../fields/NotificationFieldsMoker.js';

export class NotificationMocker {
  static mockCreateNotificationDTO(): CreateNotificationDTO {
    return {
      userId: GenericMocker.mockMongoId().toString(),
      type: GenericMocker.mockEnum(NotificationType),
      channels: [
        GenericMocker.mockEnum(NotificationChannel),
        GenericMocker.mockEnum(NotificationChannel),
      ],
      title: NotificationFieldsMocker.mockTitle(),
      message: NotificationFieldsMocker.mockMessage(),
    };
  }

  static mockNotificationDTOWithId(): WithId<NotificationDTO> {
    return {
      id: GenericMocker.mockMongoId().toString(),
      userId: GenericMocker.mockMongoId().toString(),
      type: GenericMocker.mockEnum(NotificationType),
      channels: [
        GenericMocker.mockEnum(NotificationChannel),
        GenericMocker.mockEnum(NotificationChannel),
      ],
      title: NotificationFieldsMocker.mockTitle(),
      message: NotificationFieldsMocker.mockMessage(),
      isRead: GenericMocker.mockBoolean(),
      createdAt: new Date().toISOString(),
      readAt: new Date().toISOString(),
    };
  }
}
