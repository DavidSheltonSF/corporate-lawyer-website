import { describe, beforeAll, beforeEach, afterAll, it, expect } from 'vitest';
import { NotificationModel } from '../../../models/NotificationModel';
import { NotificationMocker } from '../../../tests/mocks/entities/NotificationMocker';
import { GenericMocker } from '../../../tests/mocks/fields/GenericMocker';
import { MongodbConnector } from '../MongodbConnector';
import { MongodbNotificationRepository } from './MongodbNotificationRepository';

describe(`Testing ${MongodbNotificationRepository.name}`, () => {
  let connection: MongodbConnector | null = null;
  beforeAll(async () => {
    connection = await MongodbConnector.connectAndReturn();
  });

  beforeEach(async () => {
    await NotificationModel.deleteMany({});
  });

  afterAll(async () => {
    await connection?.disconnect();
  });

  function makeSut() {
    const notificationRepository = new MongodbNotificationRepository();

    return {
      notificationRepository,
    };
  }

  describe('should create a new notification', () => {
    it('should crate a notification', async () => {
      const { notificationRepository } = makeSut();
      const notification = NotificationMocker.mockCreateNotificationDTO();
      const created = await notificationRepository.create(notification);
      expect(created).toMatchObject(notification);
    });
  });

  describe('findById', () => {
    it('should find a notification by id', async () => {
      const { notificationRepository } = makeSut();
      const notification = NotificationMocker.mockCreateNotificationDTO();
      const notificationId = (await NotificationModel.create(notification))._id;
      const found = await notificationRepository.findById(notificationId.toString());
      expect(found).toMatchObject(notification);
    });
  });

  describe('findAll', () => {
    it('should find all notifications', async () => {
      const { notificationRepository } = makeSut();
      const notification1 = NotificationMocker.mockCreateNotificationDTO();
      const notification2 = NotificationMocker.mockCreateNotificationDTO();
      await NotificationModel.create([notification2, notification1]);
      const result = await notificationRepository.findAll();
      expect(result).toEqual(expect.arrayContaining([expect.objectContaining(notification1)]));
      expect(result).toEqual(expect.arrayContaining([expect.objectContaining(notification2)]));
    });
  });
  describe('findByUserId', () => {
    it('should find a notifications by user id', async () => {
      const { notificationRepository } = makeSut();
      const userId = GenericMocker.mockMongoId().toString();
      const notification1 = NotificationMocker.mockCreateNotificationDTO();
      const notification2 = NotificationMocker.mockCreateNotificationDTO();
      const notification3 = NotificationMocker.mockCreateNotificationDTO();

      // Notifications with the same user
      notification1.userId = userId;
      notification3.userId = userId;

      await NotificationModel.create([notification1, notification2, notification3]);

      const limit = 4;
      const page = 1;

      const { items, meta } = await notificationRepository.findByUserId(userId, { limit, page });

      expect(items).toEqual(
        expect.arrayContaining([
          expect.objectContaining(notification1),
          expect.objectContaining(notification3),
        ])
      );

      expect(meta.currentPage).toBe(page);
    });
  });
});
