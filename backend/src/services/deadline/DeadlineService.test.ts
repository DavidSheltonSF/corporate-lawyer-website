import { describe, expect, it } from 'vitest';
import { DeadlineService } from './DeadlineService';
import { createMockCaseRepository } from '../../tests/mocks/repositories/createMockCaseRepository';
import { createMockDeadlineRepository } from '../../tests/mocks/repositories/createMockDeadlineRepository';
import { BrazilHolidaysProvider } from '../BrazilHolidaysProvider';
import { DeadlineMocker } from '../../tests/mocks/entities/DeadlineMocker';
import { UpdateDeadlineDTO } from '../../dtos/deadLine/UpdateDeadlineDTO';
import { ValidationError } from '../../errors/presentation/ValidationError';

describe(`Test ${DeadlineService.name}`, () => {
  function makeSut() {
    const deadlineRepository = createMockDeadlineRepository();
    const caseRepository = createMockCaseRepository();
    const holidaysProvider = new BrazilHolidaysProvider();
    const deadlineService = new DeadlineService(
      deadlineRepository,
      caseRepository,
      holidaysProvider
    );
    const fakeId = 'fakeId';

    return {
      deadlineRepository,
      caseRepository,
      deadlineService,
      fakeId,
    };
  }

  describe('finAll', () => {
    it('should return all deadlines', async () => {
      const { deadlineRepository, deadlineService } = makeSut();

      const expectedDeadlines = [
        DeadlineMocker.mockDeadlineDTOWithId(),
        DeadlineMocker.mockDeadlineDTOWithId(),
      ];

      deadlineRepository.findAll.mockResolvedValue(expectedDeadlines);
      const deadlines = await deadlineService.findAll();

      expect(deadlines).toEqual(expectedDeadlines);
    });
  });

  describe('updateById', async () => {
    it('should update a deadeline by id', async () => {
      const { deadlineRepository, deadlineService, fakeId } = makeSut();

      const updateData: UpdateDeadlineDTO = {
        days: 25,
      };

      const expectedDeadline = DeadlineMocker.mockDeadlineDTOWithId();
      deadlineRepository.updateById.mockResolvedValue(expectedDeadline);

      const updatedDeadline = await deadlineService.updateById(fakeId, updateData);

      expect(updatedDeadline).toMatchObject(expectedDeadline);
      expect(deadlineRepository.updateById).toHaveBeenCalledWith(fakeId, updateData);
    });

    it('should throw ValidationError if any field is invalid', async () => {
      const { deadlineRepository, deadlineService, fakeId } = makeSut();

      const updateData: UpdateDeadlineDTO = {
        type: 'banana',
      };

      const expectedDeadline = DeadlineMocker.mockDeadlineDTOWithId();
      deadlineRepository.updateById.mockResolvedValue(expectedDeadline);

      await expect(deadlineService.updateById(fakeId, updateData)).rejects.toThrow(ValidationError);
      expect(deadlineRepository.updateById).not.toHaveBeenCalled();
    });

    it('should return null if the deadeline is not found', async () => {
      const { deadlineRepository, deadlineService, fakeId } = makeSut();

      const updateData: UpdateDeadlineDTO = {
        days: 25,
      };

      deadlineRepository.updateById.mockResolvedValue(null);

      const updatedDeadline = await deadlineService.updateById(fakeId, updateData);

      expect(updatedDeadline).toBeNull();
      expect(deadlineRepository.updateById).toHaveBeenCalledWith(fakeId, updateData);
    });
  });

  describe('deleteById', async () => {
    it('should delete a deadeline by id', async () => {
      const { deadlineRepository, deadlineService, fakeId } = makeSut();

      const expectedDeadline = DeadlineMocker.mockDeadlineDTOWithId();
      deadlineRepository.deleteById.mockResolvedValue(expectedDeadline);

      const deletedDeadline = await deadlineService.deleteById(fakeId);

      expect(deletedDeadline).toMatchObject(expectedDeadline);
      expect(deadlineRepository.deleteById).toHaveBeenCalledWith(fakeId);
    });

    it('should return null if the deadeline is not found', async () => {
      const { deadlineRepository, deadlineService, fakeId } = makeSut();

      deadlineRepository.deleteById.mockResolvedValue(null);

      const updatedDeadline = await deadlineService.deleteById(fakeId);

      expect(updatedDeadline).toBeNull();
      expect(deadlineRepository.deleteById).toHaveBeenCalledWith(fakeId);
    });
  });
});
