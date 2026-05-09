import { NotificationModel } from '../../../models/NotificationModel';
import { NotificationMocker } from '../../../tests/mocks/entities/NotificationMocker';
import { GenericMocker } from '../../../tests/mocks/fields/GenericMocker';
import { MongodbTestConnector } from '../MongodbTestConnector';
import { MongodbNotificationRepository } from './MongodbNotificationRepository';

describe(`Testing ${MongodbNotificationRepository.name}`, () => {
  let connection: MongodbTestConnector | null = null;
  beforeAll(async () => {
    connection = await MongodbTestConnector.connectAndReturn('deadline_repository_test');
  });

  beforeEach(async () => {
    await NotificationModel.deleteMany({});
  });

  afterAll(async () => {
    await connection?.deleteDatabase();
    await connection?.disconnect();
  });

  function makeSut() {
    const notificationRepository = new MongodbNotificationRepository();

    return {
      notificationRepository,
    };
  }

  test('should crate a notification', async () => {
    const { notificationRepository } = makeSut();
    const notificationDTO = NotificationMocker.mockCreateNotificationDTO();
    const result = await notificationRepository.create(notificationDTO);
    expect(result).toMatchObject(notificationDTO);
  });

  test('should find a notification by id', async () => {
    const { notificationRepository } = makeSut();
    const notificationDTO = NotificationMocker.mockCreateNotificationDTO();
    const notificationId = (await NotificationModel.create(notificationDTO))._id;
    const result = await notificationRepository.findById(notificationId.toString());
    expect(result).toMatchObject(notificationDTO);
  });

  test('should find all notifications', async () => {
    const { notificationRepository } = makeSut();
    const notification1 = NotificationMocker.mockCreateNotificationDTO();
    const notification2 = NotificationMocker.mockCreateNotificationDTO();
    await NotificationModel.create([notification1, notification2]);
    const result = await notificationRepository.findAll();
    expect(result).toContainEqual(expect.objectContaining(notification1));
    expect(result).toContainEqual(expect.objectContaining(notification2));
  });

  test('should find a notifications by user id', async () => {
    const { notificationRepository } = makeSut();
    const userId = GenericMocker.mockMongoId().toString();
    const notification1 = NotificationMocker.mockCreateNotificationDTO();
    const notification2 = NotificationMocker.mockCreateNotificationDTO();
    const notification3 = NotificationMocker.mockCreateNotificationDTO();

    notification1.userId = userId;
    notification3.userId = userId;

    await NotificationModel.create([notification1, notification2, notification3]);
    const query = { page: 1, limit: 4 };
    const result = await notificationRepository.findByUserId(userId, query);
    const { currentPage } = result.meta;
    const data = result.data;

    expect(data).toContainEqual(expect.objectContaining(notification1));
    expect(data).toContainEqual(expect.objectContaining(notification3));
    expect(data).not.toContainEqual(expect.objectContaining(notification2));
    expect(currentPage).toBe(query.page);
  });
});
