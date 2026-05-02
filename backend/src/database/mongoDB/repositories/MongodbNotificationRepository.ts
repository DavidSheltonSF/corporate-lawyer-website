import { CreateNotificationDTO } from '../../../dtos/notification/CreateNotificationDTO';
import { NotificationDTO } from '../../../dtos/notification/NotificationDTO';
import { NotificationeMapper } from '../../../mappers/notification/NotificationMapper';
import { NotificationModel } from '../../../models/NotificationModel';
import { NotificationRepository } from '../../../repositories/NotificationRepository';
import { WithId } from '../../../types/WithId';

export class MongodbNotificationRepository implements Partial<NotificationRepository> {
  async create(data: CreateNotificationDTO): Promise<WithId<NotificationDTO>> {
    const notification = await NotificationModel.create(data);
    return NotificationeMapper.persistenceToPresentation(notification);
  }

  async findAll(): Promise<WithId<NotificationDTO>[]> {
    const notifications = await NotificationModel.find().lean();
    return notifications.map(NotificationeMapper.persistenceToPresentation);
  }

  async findByUserId(userId: string): Promise<WithId<NotificationDTO>[]> {
    const notifications = await NotificationModel.find({ userId });
    return notifications.map(NotificationeMapper.persistenceToPresentation);
  }
  async findById(id: string): Promise<WithId<NotificationDTO> | null> {
    const notification = await NotificationModel.findById(id);
    if (!notification) {
      return null;
    }
    return NotificationeMapper.persistenceToPresentation(notification);
  }
}
