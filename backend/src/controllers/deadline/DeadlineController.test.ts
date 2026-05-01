import { DeadlineService } from '../../services/deadline/DeadlineService';
import { mockCaseRepository } from '../../tests/mocks/repositories/mockCaseRepository';
import { createMockDeadlineRepository } from '../../tests/mocks/repositories/createMockDeadlineRepository';
import { HttpStatusCode } from '../types/HttpStatusCode';
import { DeadlineController } from './DeadlineController';
import { mockUserRepository } from '../../tests/mocks/repositories/mockUserRepository';
import { UserService } from '../../services/user/UserService';
import { UserRole } from '../../types/UserRole';
import { BrazilHolidaysProvider } from '../../services/BrazilHolidaysProvider';
import { DeadlineMocker } from '../../tests/mocks/entities/DeadlineMocker';
import { UserMocker } from '../../tests/mocks/entities/UserMocker';

describe(`Test ${DeadlineController.name}`, () => {
  function makeSut() {
    const deadlineRepository = createMockDeadlineRepository();
    const caseRepository = mockCaseRepository();
    const userRepository = mockUserRepository();
    const lawyerData = UserMocker.mockUserDTOWithId();
    lawyerData.role = UserRole.lawyer;
    userRepository.findById = jest.fn().mockResolvedValue(lawyerData);
    const holidaysProvider = new BrazilHolidaysProvider();

    const userService = new UserService(userRepository, caseRepository);
    const deadlineService = new DeadlineService(
      deadlineRepository,
      caseRepository,
      holidaysProvider
    );
    const deadlineController = new DeadlineController(deadlineService, userService);

    return {
      userRepository,
      deadlineRepository,
      caseRepository,
      deadlineService,
      deadlineController,
    };
  }

  test('should retun CREATED (201) and call DeadlineRepository.create', async () => {
    const { deadlineController, deadlineRepository } = makeSut();

    const deadlineData = DeadlineMocker.mockCreateDeadlineDTO();
    const httpRequest = {
      user: {
        id: 'dsfdfa',
        email: 'fake@email.com',
      },
      body: deadlineData,
    };

    const response = await deadlineController.create(httpRequest);

    expect(deadlineRepository.create).toHaveBeenCalled();
    expect(response.status).toBe(HttpStatusCode.created);
  });

  test('should find all deadlines', async () => {
    const { deadlineController, deadlineRepository, userRepository } = makeSut();
    const httpRequest = {
      user: {
        id: 'dsfdfa',
        email: 'fake@email.com',
      },
    };

    const response = await deadlineController.findAll(httpRequest);
    expect(deadlineRepository.findAll).toHaveBeenCalled();
    expect(response.status).toBe(HttpStatusCode.ok);
  });

  test('should find a deadline by id', async () => {
    const { deadlineController, deadlineRepository, userRepository } = makeSut();
    const httpRequest = {
      user: {
        id: 'dsfdfa',
        email: 'fake@email.com',
      },
      params: { id: 'rdsfafd' },
    };

    const response = await deadlineController.findById(httpRequest);
    expect(deadlineRepository.findById).toHaveBeenCalledWith(httpRequest.params.id);
    expect(response.status).toBe(HttpStatusCode.ok);
  });

  test('should call DeadlineRepository.updatById with the provided data and return OK (200)', async () => {
    const { deadlineRepository, deadlineController } = makeSut();

    const deadlineId = 'dfsadfggsfasga';

    const deadlineData = DeadlineMocker.mockUpateDeadlineDTO();

    const httpRequest = {
      user: {
        id: 'dfsafdfafff',
        email: 'fake@email.comn',
      },
      params: { id: deadlineId },
      body: deadlineData,
    };

    const response = await deadlineController.updateById(httpRequest);
    expect(deadlineRepository.updateById).toHaveBeenCalledWith(deadlineId, deadlineData);
    expect(response.status).toBe(HttpStatusCode.ok);
  });

  test('should call DeadlineRepository.deleteById with the provided id and return OK (200)', async () => {
    const { deadlineRepository, deadlineController } = makeSut();

    const deadlineId = 'dfsadfggsfasga';

    const httpRequest = {
      user: {
        id: 'dfsafdfafff',
        email: 'fake@email.comn',
      },
      params: { id: deadlineId },
    };

    const response = await deadlineController.deleteById(httpRequest);
    expect(deadlineRepository.deleteById).toHaveBeenCalledWith(deadlineId);
    expect(response.status).toBe(HttpStatusCode.ok);
  });
});
