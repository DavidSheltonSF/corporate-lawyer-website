import { CreateNotificationDTO } from '../../dtos/notification/CreateNotificationDTO';
import { NotificationDTO } from '../../dtos/notification/NotificationDTO';
import { NotificationRepository } from '../../repositories/NotificationRepository';
import { WithId } from '../../types/WithId';
import { INotificationService } from './INotificationService';

export class NotificationService implements INotificationService {
  constructor(private readonly notificationRepository: NotificationRepository) {}
  async create(data: CreateNotificationDTO): Promise<WithId<NotificationDTO>> {
    return await this.notificationRepository.create(data);
  }

  async findById(id: string): Promise<WithId<NotificationDTO> | null> {
    return this.notificationRepository.findById(id);
  }

  async findByUserId(userId: string): Promise<WithId<NotificationDTO>[]> {
    return this.notificationRepository.findByUserId(userId);
  }
}
