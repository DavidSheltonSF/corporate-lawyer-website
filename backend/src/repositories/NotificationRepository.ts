import { CreateNotificationDTO } from '../dtos/notification/CreateNotificationDTO.js';
import { NotificationDTO } from '../dtos/notification/NotificationDTO.js';
import { UpdateNotificationDTO } from '../dtos/notification/UpdateNotificationDTO.js';
import { NotificationQuery } from '../types/NotificationQuery.js';
import { Page } from '../types/Page.js';
import { WithId } from '../types/WithId.js';

export interface NotificationRepository {
  create(notification: CreateNotificationDTO): Promise<WithId<NotificationDTO>>;
  findAll(): Promise<WithId<NotificationDTO>[]>;
  findById(id: string): Promise<WithId<NotificationDTO> | null>;
  findByUserId(
    id: string,
    notificationQuery: NotificationQuery
  ): Promise<Page<WithId<NotificationDTO>>>;
  updateById(id: string, data: UpdateNotificationDTO): Promise<WithId<NotificationDTO> | null>;
}
