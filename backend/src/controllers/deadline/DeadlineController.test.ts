import { HttpStatusCode } from '../types/HttpStatusCode';
import { DeadlineController } from './DeadlineController';
import { DeadlineMocker } from '../../tests/mocks/entities/DeadlineMocker';
import { createMockDeadlineService } from '../../tests/mocks/services/createMockDeadlineService';
import { createMockHttpRequest } from '../../tests/mocks/createMockHttpRequest';
import { SuccessResponse } from '../types/HttpResponse';
import { DeadlineDTO } from '../../dtos/deadLine/DeadlineDTO';
import { WithId } from '../../types/WithId';

describe(`Test ${DeadlineController.name}`, () => {
  function makeSut() {
    const deadlineService = createMockDeadlineService();
    const deadlineController = new DeadlineController(deadlineService);

    return {
      deadlineService,
      deadlineController,
    };
  }

  describe('create', () => {
    it('should retun the created deadline and return CREATED', async () => {
      const { deadlineController, deadlineService } = makeSut();

      const deadlineData = DeadlineMocker.mockCreateDeadlineDTO();
      const expectedDTO = { ...DeadlineMocker.mockDeadlineDTOWithId(), ...deadlineData };

      const httpRequest = createMockHttpRequest({
        body: deadlineData,
      });

      deadlineService.create.mockResolvedValue(expectedDTO);
      const response = (await deadlineController.create(
        httpRequest
      )) as SuccessResponse<DeadlineDTO>;
      expect(deadlineService.create).toHaveBeenCalledWith(deadlineData);
      expect(response.status).toBe(HttpStatusCode.created);
      expect(response.data).toEqual(expect.objectContaining(expectedDTO));
    });
  });

  describe('findAll', () => {
    it('should find all deadlines', async () => {
      const { deadlineController, deadlineService } = makeSut();
      const httpRequest = createMockHttpRequest();

      const expectedDeadlineList = [DeadlineMocker.mockDeadlineDTOWithId()];
      deadlineService.findAll.mockResolvedValue(expectedDeadlineList);

      const response = (await deadlineController.findAll(httpRequest)) as SuccessResponse<
        WithId<DeadlineDTO>[]
      >;
      expect(deadlineService.findAll).toHaveBeenCalled();
      expect(response.status).toBe(HttpStatusCode.ok);
    });
  });

  describe('findById', () => {
    it('should find a deadline by id', async () => {
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

      const response = (await deadlineController.findById(httpRequest)) as SuccessResponse<
        WithId<DeadlineDTO>
      >;

      expect(deadlineService.findById).toHaveBeenCalledWith(id);
      expect(response.status).toBe(HttpStatusCode.ok);
      expect(response.data).toEqual(expect.objectContaining(expectedDeadline));
    });
  });

  describe('update', () => {
    it('should update the deadline and return OK', async () => {
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

      const response = (await deadlineController.updateById(httpRequest)) as SuccessResponse<
        WithId<DeadlineDTO>
      >;

      expect(deadlineService.updateById).toHaveBeenCalledWith(id, updateData);
      expect(response.status).toBe(HttpStatusCode.ok);
      expect(response.data).toEqual(expect.objectContaining(expectedDeadline));
    });
  });

  describe('delete', () => {
    it('should delete a deadline and return OK', async () => {
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
});
