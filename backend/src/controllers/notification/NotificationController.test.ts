import { NotificationService } from '../../services/notification/NotificationService';
import { mockNotificationRepository } from '../../tests/mocks/repositories/mockNotificationRepository';
import { NotificationMocker } from '../../tests/mocks/entities/NotificationMocker';
import { HttpRequest } from '../types/HttpRequest';
import { HttpStatusCode } from '../types/HttpStatusCode';
import { NotificationController } from './NotificationController';

describe(`Test ${NotificationController.name}`, () => {
  function makeSut() {
    const notificationRepository = mockNotificationRepository();
    const lawyerData = NotificationMocker.mockNotificationDTOWithId();
    notificationRepository.findById = jest.fn().mockResolvedValue(lawyerData);

    const notificationService = new NotificationService(notificationRepository);
    const notificationController = new NotificationController(notificationService);

    const httpRequest: HttpRequest = {
      params: {
        id: 'fakeId',
      },
      query: {},
      body: {},
      headers: {},
    };

    return {
      notificationRepository,
      notificationService,
      notificationController,
      httpRequest,
    };
  }

  test('should call NotificationRepository.findById with the provided id and return OK (200)', async () => {
    const { notificationController, notificationRepository, httpRequest } = makeSut();

    httpRequest.params = { id: 'gfdgfdsgsdggg' };

    const response = await notificationController.findById(httpRequest);
    expect(notificationRepository.findById).toHaveBeenCalledWith(httpRequest.params.id);
    expect(response.status).toBe(HttpStatusCode.ok);
  });

  test('should call NotificationRepository.findByUserId with the provided ID and return OK (200)', async () => {
    const { notificationController, notificationRepository, httpRequest } = makeSut();

    httpRequest.user = { id: 'gfdgfdsgsdggg', email: 'fake@email.com' };

    httpRequest.params = { id: 'gfdgfdsgsdggg' };
    httpRequest.query = { page: 1, limit: 4 };

    const response = await notificationController.findMy(httpRequest);
    expect(notificationRepository.findByUserId).toHaveBeenCalledWith(
      httpRequest.params.id,
      httpRequest.query
    );
    expect(response.status).toBe(HttpStatusCode.ok);
  });
});
