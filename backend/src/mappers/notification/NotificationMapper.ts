import { NotificationDTO } from '../../dtos/notification/NotificationDTO';
import { WithId } from '../../types/WithId';

export class NotificationeMapper {
  static persistenceToPresentation(notification: any): WithId<NotificationDTO> {
    const { _id, userId, title, message, type, channels, isRead, createdAt, readAt, metadata } =
      notification;

    return {
      id: _id.toString(),
      userId: userId.toString(),
      title,
      message,
      type,
      channels,
      isRead,
      createdAt: createdAt.toISOString(),
      readAt: readAt?.toISOString() || null,
      metadata,
    };
  }
}
