import { CreateNotificationDTO } from '../../dtos/notification/CreateNotificationDTO.js';
import { NotificationDTO } from '../../dtos/notification/NotificationDTO.js';
import { NotificationQuery } from '../../types/NotificationQuery.js';
import { Page } from '../../types/Page.js';
import { WithId } from '../../types/WithId.js';

export interface INotificationService {
  create(data: CreateNotificationDTO): Promise<WithId<NotificationDTO>>;
  findById(id: string): Promise<WithId<NotificationDTO> | null>;
  findByUserId(
    id: string,
    notificationQuery: NotificationQuery
  ): Promise<Page<WithId<NotificationDTO>>>;
  markAsRead(id: string): Promise<WithId<NotificationDTO> | null>;
}
