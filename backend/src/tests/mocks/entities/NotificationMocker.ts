import { CreateNotificationDTO } from '../../../dtos/notification/CreateNotificationDTO';
import { NotificationDTO } from '../../../dtos/notification/NotificationDTO';
import { NotificationChannel } from '../../../types/NotificationChannel';
import { NotificationType } from '../../../types/NotificationType';
import { WithId } from '../../../types/WithId';
import { GenericMocker } from '../fields/GenericMocker';
import { NotificationFieldsMocker } from '../fields/NotificationFieldsMoker';

export class NotificationMocker {
  static mockCreateNotificationDTO(): CreateNotificationDTO {
    return {
      userId: GenericMocker.mockMongoId().toString(),
      type: GenericMocker.mockEnum(NotificationType),
      channel: [
        GenericMocker.mockEnum(NotificationChannel),
        GenericMocker.mockEnum(NotificationChannel),
      ],
      title: NotificationFieldsMocker.mockTitle(),
      message: NotificationFieldsMocker.mockMessage(),
      isRead: GenericMocker.mockBoolean(),
      readAt: new Date().toISOString(),
    };
  }

  static mockNotificationDTOWithId(): WithId<NotificationDTO> {
    return {
      id: GenericMocker.mockMongoId().toString(),
      userId: GenericMocker.mockMongoId().toString(),
      type: GenericMocker.mockEnum(NotificationType),
      channel: [
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
