import { describe, expect, it } from 'vitest';
import { NotificationMocker } from '../../tests/mocks/entities/NotificationMocker';
import { HttpStatusCode } from '../types/HttpStatusCode';
import { NotificationController } from './NotificationController';
import { createMockHttpRequest } from '../../tests/mocks/createMockHttpRequest';
import { createMockNotificationService } from '../../tests/mocks/services/createMockNotificationService';
import { BadRequestError } from '../../errors/presentation/BadRequestError';
import { NotFoundError } from '../../errors/presentation/NotFoundError';
import { UserRole } from '../../types/UserRole';
import { createMockPage } from '../../tests/mocks/createMockPage';

describe(`Test ${NotificationController.name}`, () => {
  function makeSut() {
    const notificationService = createMockNotificationService();
    const notificationController = new NotificationController(notificationService);
    const fakeId = 'fakeId';

    return {
      notificationService,
      notificationController,
      fakeId,
    };
  }

  describe('findById', () => {
    it('should find notification by id and return OK (200)', async () => {
      const { notificationService, notificationController, fakeId } = makeSut();

      const httpRequest = createMockHttpRequest({ params: { id: fakeId } });

      const expectedNotification = NotificationMocker.mockNotificationDTOWithId();
      notificationService.findById.mockResolvedValue(expectedNotification);

      const response = await notificationController.findById(httpRequest);

      expect(response).toMatchObject({
        status: HttpStatusCode.ok,
        data: expectedNotification,
      });
      expect(notificationService.findById).toHaveBeenCalledWith(fakeId);
    });

    it('should throw BadRequestError if id param is missing', async () => {
      const { notificationService, notificationController } = makeSut();

      const httpRequest = createMockHttpRequest();

      await expect(notificationController.findById(httpRequest)).rejects.toThrow(BadRequestError);
      expect(notificationService.findById).not.toHaveBeenCalled();
    });

    it('should throw NotFoundError if notification is not found', async () => {
      const { notificationService, notificationController, fakeId } = makeSut();

      const httpRequest = createMockHttpRequest({ params: { id: fakeId } });

      notificationService.findById.mockResolvedValue(null);

      await expect(notificationController.findById(httpRequest)).rejects.toThrow(NotFoundError);
      expect(notificationService.findById).toHaveBeenCalledWith(fakeId);
    });
  });

  describe('findMy', () => {
    it("should find all authenticated user's notifications and return ok", async () => {
      const { notificationService, notificationController, fakeId } = makeSut();

      const httpRequest = createMockHttpRequest({
        user: {
          id: fakeId,
          email: 'fake@email.com',
          role: UserRole.client,
        },
      });

      const notification1 = NotificationMocker.mockNotificationDTOWithId();
      const notification2 = NotificationMocker.mockNotificationDTOWithId();
      const notifications = [notification1, notification2];
      const limit = 4;
      const page = 1;
      const mockPage = createMockPage(notifications, { limit, page });
      notificationService.findByUserId.mockResolvedValue(mockPage);

      const response = await notificationController.findMy(httpRequest);
      console.log(response);

      expect(response).toMatchObject({
        status: HttpStatusCode.ok,
        data: mockPage,
      });
    });
  });

  describe('markAsRead', () => {
    it('should mark a notification as read and return OK (200)', async () => {
      const { notificationService, notificationController, fakeId } = makeSut();

      const httpRequest = createMockHttpRequest({ params: { id: fakeId } });

      const expectedNotification = NotificationMocker.mockNotificationDTOWithId();
      notificationService.markAsRead.mockResolvedValue(expectedNotification);

      const response = await notificationController.markAsRead(httpRequest);

      expect(response).toMatchObject({
        status: HttpStatusCode.ok,
        data: expectedNotification,
      });
      expect(notificationService.markAsRead).toHaveBeenCalledWith(fakeId);
    });

    it('should throw BadRequestError if id param is missing', async () => {
      const { notificationService, notificationController } = makeSut();

      const httpRequest = createMockHttpRequest();

      await expect(notificationController.markAsRead(httpRequest)).rejects.toThrow(BadRequestError);
      expect(notificationService.markAsRead).not.toHaveBeenCalled();
    });

    it('should throw NotFoundError if notification is not found', async () => {
      const { notificationService, notificationController, fakeId } = makeSut();

      const httpRequest = createMockHttpRequest({ params: { id: fakeId } });

      notificationService.markAsRead.mockResolvedValue(null);

      await expect(notificationController.markAsRead(httpRequest)).rejects.toThrow(NotFoundError);
      expect(notificationService.markAsRead).toHaveBeenCalledWith(fakeId);
    });
  });
});
