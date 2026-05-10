import { CreateNotificationDTO } from '../../dtos/notification/CreateNotificationDTO';
import { NotificationDTO } from '../../dtos/notification/NotificationDTO';
import { NotificationQuery } from '../../types/NotificationQuery';
import { Page } from '../../types/Page';
import { WithId } from '../../types/WithId';

export interface INotificationService {
  create(data: CreateNotificationDTO): Promise<WithId<NotificationDTO>>;
  findById(id: string): Promise<WithId<NotificationDTO> | null>;
  findByUserId(
    id: string,
    notificationQuery: NotificationQuery
  ): Promise<Page<WithId<NotificationDTO>>>;
  markAsRead(id: string): Promise<WithId<NotificationDTO> | null>;
}
