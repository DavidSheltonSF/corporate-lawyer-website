import { mockNotificationRepository } from '../../tests/mocks/repositories/mockNotificationRepository';
import { NotificationMocker } from '../../tests/mocks/entities/NotificationMocker';
import { NotificationService } from './NotificationService';

describe(`Test ${NotificationService.name}`, () => {
  function makeSut() {
    const notificationRepository = mockNotificationRepository();
    const notificationService = new NotificationService(notificationRepository);

    return {
      notificationRepository,
      notificationService,
    };
  }

  test('should call NotificationRepository.create', async () => {
    const { notificationService, notificationRepository } = makeSut();
    const createNotificationDTO = NotificationMocker.mockCreateNotificationDTO();
    await notificationService.create(createNotificationDTO);
    expect(notificationRepository.create).toHaveBeenCalled();
  });

  test('should find notification by id', async () => {
    const { notificationService, notificationRepository } = makeSut();
    const id = 'testid--fnsianf';
    await notificationService.findById(id);
    expect(notificationRepository.findById).toHaveBeenCalledWith(id);
  });

  test('should find notifications by user id', async () => {
    const { notificationService, notificationRepository } = makeSut();
    const userId = 'testid--fnsianf';
    const query = { page: 1, limit: 4 };
    await notificationService.findByUserId(userId, query);
    expect(notificationRepository.findByUserId).toHaveBeenCalledWith(userId, query);
  });
});
