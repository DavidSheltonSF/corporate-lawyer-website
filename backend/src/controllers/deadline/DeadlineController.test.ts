import { Types } from 'mongoose';
import { DeadlineService } from '../../services/deadline/DeadlineService';
import { createMockCaseRepository } from '../../tests/mocks/repositories/createMockCaseRepository';
import { createMockDeadlineRepository } from '../../tests/mocks/repositories/createMockDeadlineRepository';
import { HttpStatusCode } from '../types/HttpStatusCode';
import { DeadlineController } from './DeadlineController';
import { DeadlineType } from '../../types/DeadLineType';
import { DeadlineStatus } from '../../types/DeadLineStatus';
import { DeadlinePriority } from '../../types/DeadLinePriority';
import { createMockUserRepository } from '../../tests/mocks/repositories/createMockUserRepository';
import { UserService } from '../../services/user/UserService';
import { UserRole } from '../../types/UserRole';

describe(`Test ${DeadlineController.name}`, () => {
  function makeSut() {
    const deadlineRepository = createMockDeadlineRepository();
    const caseRepository = createMockCaseRepository();
    const userRepository = createMockUserRepository();
    userRepository.findById = jest.fn().mockResolvedValue({
      _id: 'dfsfsdfasfdsfadf',
      firstName: 'Carla',
      lastName: 'Medeiros',
      email: 'carla@email.com',
      cpf: '12555877744',
      password: 'Carla#456',
      role: UserRole.lawyer,
    });

    const userService = new UserService(userRepository, caseRepository);
    const deadlineService = new DeadlineService(deadlineRepository, caseRepository);
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

    const newDeadline = {
      caseId: Types.ObjectId.createFromTime(848484).toString(),
      clientId: Types.ObjectId.createFromTime(8484).toString(),
      type: DeadlineType.PAGAMENTO,
      startDate: '2050-02-02',
      dueDate: '2050-03-02',
      status: DeadlineStatus.EM_ANDAMENTO,
      priority: DeadlinePriority.ALTA,
    };
    const httpRequest = {
      user: {
        id: 'dsfdfa',
        email: 'fake@email.com',
      },
      body: newDeadline,
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

    const deadlineData = {
      type: DeadlineType.PAGAMENTO,
      startDate: '2050-02-02',
      dueDate: '2050-03-02',
      status: DeadlineStatus.EM_ANDAMENTO,
      priority: DeadlinePriority.ALTA,
    };

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
