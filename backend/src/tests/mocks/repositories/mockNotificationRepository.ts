import { NotificationRepository } from '../../../repositories/NotificationRepository';
import { NotificationMocker } from '../entities/NotificationMocker';

export const mockNotificationRepository = (): NotificationRepository => {
  return {
    create: jest.fn().mockResolvedValue(NotificationMocker.mockNotificationDTOWithId()),
    findById: jest.fn().mockResolvedValue(NotificationMocker.mockNotificationDTOWithId()),
    findByUserId: jest.fn().mockResolvedValue([NotificationMocker.mockNotificationDTOWithId()]),
    findAll: jest
      .fn()
      .mockResolvedValue([
        NotificationMocker.mockNotificationDTOWithId(),
        NotificationMocker.mockNotificationDTOWithId(),
      ]),
  };
};
