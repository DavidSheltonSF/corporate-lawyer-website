import { CreateNotificationDTO } from '../dtos/notification/CreateNotificationDTO';
import { NotificationDTO } from '../dtos/notification/NotificationDTO';
import { WithId } from '../types/WithId';

export interface NotificationRepository {
  create(notification: CreateNotificationDTO): Promise<WithId<NotificationDTO>>;
  findAll(): Promise<WithId<NotificationDTO>[]>;
  findById(id: string): Promise<WithId<NotificationDTO> | null>;
  findByUserId(id: string): Promise<WithId<NotificationDTO>[]>;
}
