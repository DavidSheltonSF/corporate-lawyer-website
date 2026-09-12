import { CreateNotificationDTO } from '../../dtos/notification/CreateNotificationDTO.js';
import { NotificationDTO } from '../../dtos/notification/NotificationDTO.js';
import { NotificationRepository } from '../../repositories/NotificationRepository.js';
import { NotificationQuery } from '../../types/NotificationQuery.js';
import { Page } from '../../types/Page.js';
import { WithId } from '../../types/WithId.js';
import { INotificationService } from './INotificationService.js';

export class NotificationService implements INotificationService {
  constructor(private readonly notificationRepository: NotificationRepository) {}
  async create(data: CreateNotificationDTO): Promise<WithId<NotificationDTO>> {
    return await this.notificationRepository.create(data);
  }

  async findById(id: string): Promise<WithId<NotificationDTO> | null> {
    return this.notificationRepository.findById(id);
  }

  async findByUserId(
    userId: string,
    notificationQuery: NotificationQuery
  ): Promise<Page<WithId<NotificationDTO>>> {
    return this.notificationRepository.findByUserId(userId, notificationQuery);
  }

  async markAsRead(id: string): Promise<WithId<NotificationDTO> | null> {
    return this.notificationRepository.updateById(id, { isRead: true, readAt: new Date() });
  }
}
