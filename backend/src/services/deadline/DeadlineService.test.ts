import { describe, expect, it } from 'vitest';
import { DeadlineService } from './DeadlineService.js';
import { createMockCaseRepository } from '../../tests/mocks/repositories/createMockCaseRepository.js';
import { createMockDeadlineRepository } from '../../tests/mocks/repositories/createMockDeadlineRepository.js';
import { BrazilHolidaysProvider } from '../BrazilHolidaysProvider.js';
import { DeadlineMocker } from '../../tests/mocks/entities/DeadlineMocker.js';
import { UpdateDeadlineDTO } from '../../dtos/deadLine/UpdateDeadlineDTO.js';
import { ValidationError } from '../../errors/presentation/ValidationError.js';
import { DeadlineStatus } from '../../types/DeadLineStatus.js';
import { addDays, getTomorrow, getYesterday } from '../../utils/dateUtils.js';
import { DeadlineCountingType } from '../../types/DeadlineCountingType.js';

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

  describe('findAll', () => {
    it('should return all deadlines', async () => {
      const { deadlineRepository, deadlineService } = makeSut();

      // PENDENTE - DIAS CORRIDOS
      const deadline1 = DeadlineMocker.mockDeadlineDTOWithId();
      deadline1.startDate = getTomorrow().toString();
      deadline1.dueDate = addDays(new Date(deadline1.startDate), 5).toString();
      deadline1.countingType = DeadlineCountingType.DIAS_CORRIDOS;

      //  EM_ANDAMENTO -  DIAS CORRIDOS
      const deadline2 = DeadlineMocker.mockDeadlineDTOWithId();
      deadline2.startDate = getYesterday().toString();
      deadline2.dueDate = addDays(new Date(deadline2.startDate), 5).toString();
      deadline2.countingType = DeadlineCountingType.DIAS_CORRIDOS;

      const expectedDeadlines = [deadline1, deadline2];

      deadlineRepository.findAll.mockResolvedValue(expectedDeadlines);
      const deadlines = await deadlineService.findAll();

      expect(deadlines).toEqual([
        expect.objectContaining({
          ...deadline1,
          status: DeadlineStatus.PENDENTE,
          remainingDays: 6,
        }),
        expect.objectContaining({
          ...deadline2,
          status: DeadlineStatus.EM_ANDAMENTO,
          remainingDays: 4,
        }),
      ]);
    });
  });

  describe('findByCaseId', () => {
    it('should find deadlines by case id', async () => {
      const { deadlineRepository, caseRepository, deadlineService } = makeSut();

      const caseId = 'fake-id';

      caseRepository.existsById.mockResolvedValue(true);

      // PENDENTE - DIAS CORRIDOS
      const deadline1 = DeadlineMocker.mockDeadlineDTOWithId();
      deadline1.startDate = getTomorrow().toString();
      deadline1.dueDate = addDays(new Date(deadline1.startDate), 5).toString();
      deadline1.countingType = DeadlineCountingType.DIAS_CORRIDOS;
      deadline1.caseId = caseId;

      //  EM_ANDAMENTO -  DIAS CORRIDOS
      const deadline2 = DeadlineMocker.mockDeadlineDTOWithId();
      deadline2.startDate = getYesterday().toString();
      deadline2.dueDate = addDays(new Date(deadline2.startDate), 5).toString();
      deadline2.countingType = DeadlineCountingType.DIAS_CORRIDOS;
      deadline2.caseId = caseId;

      const expectedDeadlines = [deadline1, deadline2];

      deadlineRepository.findByCaseId.mockResolvedValue(expectedDeadlines);
      const deadlines = await deadlineService.findByCaseId(caseId);

      expect(caseRepository.existsById).toHaveBeenCalledWith(caseId);
      expect(deadlineRepository.findByCaseId).toHaveBeenCalledWith(caseId);
      expect(deadlines).toEqual([
        expect.objectContaining({
          ...deadline1,
          status: DeadlineStatus.PENDENTE,
          remainingDays: 6,
        }),
        expect.objectContaining({
          ...deadline2,
          status: DeadlineStatus.EM_ANDAMENTO,
          remainingDays: 4,
        }),
      ]);
    });
  });

  describe('findById', () => {
    it('should find a deadline by id', async () => {
      const { deadlineRepository, deadlineService } = makeSut();

      const expectedDeadline = DeadlineMocker.mockDeadlineDTOWithId();
      expectedDeadline.startDate = getTomorrow().toString();
      expectedDeadline.dueDate = addDays(new Date(expectedDeadline.startDate), 5).toString();

      deadlineRepository.findById.mockResolvedValue(expectedDeadline);

      const foundDeadline = await deadlineService.findById(expectedDeadline.id);

      expect(foundDeadline).toMatchObject({
        caseId: expectedDeadline.caseId,
        countingType: expectedDeadline.countingType,
        days: expectedDeadline.days,
        lawyerId: expectedDeadline.lawyerId,
        priority: expectedDeadline.priority,
        status: DeadlineStatus.PENDENTE,
        type: expectedDeadline.type,
        startDate: expectedDeadline.startDate,
        dueDate: expectedDeadline.dueDate,
        intimationDate: expectedDeadline.intimationDate,
        caseLocation: expectedDeadline.caseLocation,
      });
      expect(foundDeadline?.caseLocation).toMatchObject(expectedDeadline.caseLocation);
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
