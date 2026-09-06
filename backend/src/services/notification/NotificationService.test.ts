import { describe, expect, it } from 'vitest';
import { NotificationMocker } from '../../tests/mocks/entities/NotificationMocker';
import { NotificationService } from './NotificationService';
import { createMockNotificationRepository } from '../../tests/mocks/repositories/createMockNotificationRepository';

describe(`Test ${NotificationService.name}`, () => {
  function makeSut() {
    const notificationRepository = createMockNotificationRepository();
    const notificationService = new NotificationService(notificationRepository);
    const fakeId = 'fakeId';

    return {
      notificationRepository,
      notificationService,
      fakeId,
    };
  }

  describe('create', () => {
    it('should create a new notification', async () => {
      const { notificationService, notificationRepository } = makeSut();
      const notificationData = NotificationMocker.mockCreateNotificationDTO();
      await notificationService.create(notificationData);
      expect(notificationRepository.create).toHaveBeenCalledWith(notificationData);
    });
  });

  describe('findById', () => {
    it('should find notification by id', async () => {
      const { notificationService, notificationRepository, fakeId } = makeSut();

      const expectedNotification = NotificationMocker.mockNotificationDTOWithId();
      notificationRepository.findById.mockResolvedValue(expectedNotification);

      const notification = await notificationService.findById(fakeId);

      expect(notification).toMatchObject(expectedNotification);
      expect(notificationRepository.findById).toHaveBeenCalledWith(fakeId);
    });

    it('should return null if notification is not found', async () => {
      const { notificationService, notificationRepository, fakeId } = makeSut();

      notificationRepository.findById.mockResolvedValue(null);
      const notification = await notificationService.findById(fakeId);

      expect(notification).toBeNull();
      expect(notificationRepository.findById).toHaveBeenCalledWith(fakeId);
    });
  });

  describe('findByUserId', () => {
    it('should find notifications by user id', async () => {
      const { notificationService, notificationRepository, fakeId } = makeSut();
      const query = { page: 1, limit: 4 };
      await notificationService.findByUserId(fakeId, query);
      expect(notificationRepository.findByUserId).toHaveBeenCalledWith(fakeId, query);
    });
  });
});
