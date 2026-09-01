import { HttpStatusCode } from '../types/HttpStatusCode';
import { DeadlineController } from './DeadlineController';
import { mockUserRepository } from '../../tests/mocks/repositories/mockUserRepository';
import { UserRole } from '../../types/UserRole';
import { DeadlineMocker } from '../../tests/mocks/entities/DeadlineMocker';
import { UserMocker } from '../../tests/mocks/entities/UserMocker';
import { createMockDeadlineService } from '../../tests/mocks/services/createMockDeadlineService';
import { createMockHttpRequest } from '../../tests/mocks/createMockHttpRequest';
import { SuccessResponse } from '../types/HttpResponse';
import { DeadlineDTO } from '../../dtos/deadLine/DeadlineDTO';

describe(`Test ${DeadlineController.name}`, () => {
  function makeSut() {
    const userRepository = mockUserRepository();
    const lawyerData = UserMocker.mockUserDTOWithId();
    lawyerData.role = UserRole.lawyer;
    userRepository.findById = jest.fn().mockResolvedValue(lawyerData);

    const deadlineService = createMockDeadlineService();
    const deadlineController = new DeadlineController(deadlineService);

    return {
      deadlineService,
      deadlineController,
    };
  }

  test('should retun the created deadline and return CREATED', async () => {
    const { deadlineController, deadlineService } = makeSut();

    const deadlineData = DeadlineMocker.mockCreateDeadlineDTO();
    const expectedDTO = { ...DeadlineMocker.mockDeadlineDTOWithId(), ...deadlineData };

    const httpRequest = createMockHttpRequest({
      body: deadlineData,
    });

    deadlineService.create.mockResolvedValue(expectedDTO);
    const response = (await deadlineController.create(httpRequest)) as SuccessResponse<DeadlineDTO>;
    expect(deadlineService.create).toHaveBeenCalledWith(deadlineData);
    expect(response.status).toBe(HttpStatusCode.created);
  });

  test('should find all deadlines', async () => {
    const { deadlineController, deadlineService } = makeSut();
    const httpRequest = createMockHttpRequest();

    const response = await deadlineController.findAll(httpRequest);
    expect(deadlineService.findAll).toHaveBeenCalled();
    expect(response.status).toBe(HttpStatusCode.ok);
  });

  test('should find a deadline by id', async () => {
    const { deadlineController, deadlineService } = makeSut();
    const id = 'fakeId';
    const expectedDeadline = {
      ...DeadlineMocker.mockDeadlineDTOWithId(),
      ...{ id },
    };
    const httpRequest = createMockHttpRequest({
      params: {
        id,
      },
    });

    deadlineService.findById.mockResolvedValue(expectedDeadline);

    const response = await deadlineController.findById(httpRequest);

    expect(deadlineService.findById).toHaveBeenCalledWith(id);
    expect(response.status).toBe(HttpStatusCode.ok);
  });

  test('should update the deadline and return OK', async () => {
    const { deadlineController, deadlineService } = makeSut();

    const id = 'dfsadfggsfasga';
    const updateData = DeadlineMocker.mockUpateDeadlineDTO();
    const expectedDeadline = {
      ...DeadlineMocker.mockDeadlineDTOWithId(),
      ...{ id },
      ...updateData,
    };

    const httpRequest = createMockHttpRequest({
      params: { id },
      body: updateData,
    });

    deadlineService.updateById.mockResolvedValue(expectedDeadline);

    const response = await deadlineController.updateById(httpRequest);

    expect(deadlineService.updateById).toHaveBeenCalledWith(id, updateData);
    expect(response.status).toBe(HttpStatusCode.ok);
  });

  test('should delete a deadline and return OK', async () => {
    const { deadlineController, deadlineService } = makeSut();

    const id = 'dfsadfggsfasga';
    const expectedDeadline = {
      ...DeadlineMocker.mockDeadlineDTOWithId(),
      ...{ id },
    };

    const httpRequest = createMockHttpRequest({
      params: { id },
    });

    deadlineService.deleteById.mockResolvedValue(expectedDeadline);

    const response = await deadlineController.deleteById(httpRequest);
    expect(deadlineService.deleteById).toHaveBeenCalledWith(id);
    expect(response.status).toBe(HttpStatusCode.ok);
  });
});
