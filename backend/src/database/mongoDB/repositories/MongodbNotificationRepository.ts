import { CreateNotificationDTO } from '../../../dtos/notification/CreateNotificationDTO.js';
import { NotificationDTO } from '../../../dtos/notification/NotificationDTO.js';
import { UpdateNotificationDTO } from '../../../dtos/notification/UpdateNotificationDTO.js';
import { NotificationeMapper } from '../../../mappers/notification/NotificationMapper.js';
import { NotificationModel } from '../../../models/NotificationModel.js';
import { NotificationRepository } from '../../../repositories/NotificationRepository.js';
import { NotificationQuery } from '../../../types/NotificationQuery.js';
import { Page } from '../../../types/Page.js';
import { WithId } from '../../../types/WithId.js';

export class MongodbNotificationRepository implements Partial<NotificationRepository> {
  async create(data: CreateNotificationDTO): Promise<WithId<NotificationDTO>> {
    const notification = await NotificationModel.create(data);
    return NotificationeMapper.persistenceToPresentation(notification);
  }

  async findAll(): Promise<WithId<NotificationDTO>[]> {
    const notifications = await NotificationModel.find().lean();
    return notifications.map(NotificationeMapper.persistenceToPresentation);
  }

  async findByUserId(
    userId: string,
    notificationQuery: NotificationQuery
  ): Promise<Page<WithId<NotificationDTO>>> {
    const { limit = 4, page = 1 } = notificationQuery;
    const notificationsPromise = NotificationModel.find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();

    const totalItemsPromise = NotificationModel.countDocuments();

    const [notifications, totalItems] = await Promise.all([
      notificationsPromise,
      totalItemsPromise,
    ]);
    const mappedNotifications = notifications.map(NotificationeMapper.persistenceToPresentation);

    return {
      items: mappedNotifications,
      meta: {
        currentPage: page,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
      },
    };
  }

  async findById(id: string): Promise<WithId<NotificationDTO> | null> {
    const notification = await NotificationModel.findById(id);
    if (!notification) {
      return null;
    }
    return NotificationeMapper.persistenceToPresentation(notification);
  }

  async updateById(
    id: string,
    data: UpdateNotificationDTO
  ): Promise<WithId<NotificationDTO> | null> {
    const result = await NotificationModel.findOneAndUpdate({ _id: id }, data, {
      returnDocument: 'after',
    });
    if (!result) {
      console.log(null);
      return null;
    }
    return NotificationeMapper.persistenceToPresentation(result);
  }
}
