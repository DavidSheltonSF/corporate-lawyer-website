import { CreateNotificationDTO } from '../dtos/notification/CreateNotificationDTO';
import { NotificationDTO } from '../dtos/notification/NotificationDTO';
import { UpdateNotificationDTO } from '../dtos/notification/UpdateNotificationDTO';
import { NotificationQuery } from '../types/NotificationQuery';
import { Page } from '../types/Page';
import { WithId } from '../types/WithId';

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
