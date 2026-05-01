import { Types } from 'mongoose';
import { createMockCaseRepository } from '../../tests/mocks/repositories/createMockCaseRepository';
import { createMockDeadlineRepository } from '../../tests/mocks/repositories/createMockDeadlineRepository';
import { DeadlineService } from './DeadlineService';
import { DeadlineType } from '../../types/DeadLineType';
import { DeadlinePriority } from '../../types/DeadLinePriority';
import { InvalidDeadlineTypeError } from '../../errors/domain/InvalidDeadlineTypeError';
import { InvalidDeadlinePriorityError } from '../../errors/domain/InvalidDeadlinePriorityError';
import { InvalidDateError } from '../../errors/domain/InvalidDateError';
import { BrazilState } from '../../types/BrazilState';
import { City } from '../../types/City';
import { BrazilHolidaysProvider } from '../BrazilHolidaysProvider';
import { createDate } from '../../utils/createDate';
import { DeadlineCalculator } from '../helpers/DeadlineCalculator';
import { DeadlineMocker } from '../../tests/mocks/entities/DeadlineMocker';

describe(`Test ${DeadlineService.name}`, () => {
  function makeSut() {
    const caseRepository = createMockCaseRepository();
    const deadlineRepository = createMockDeadlineRepository();
    const holidaysProvider = new BrazilHolidaysProvider();
    const deadlineService = new DeadlineService(
      deadlineRepository,
      caseRepository,
      holidaysProvider
    );

    return {
      deadlineRepository,
      deadlineService,
      holidaysProvider,
    };
  }

  test('should call DeadlineRepository.create', async () => {
    const { deadlineService, deadlineRepository, holidaysProvider } = makeSut();

    const deadlineData = DeadlineMocker.mockCreateDeadlineDTO();

    const deadlineCalculator = new DeadlineCalculator(holidaysProvider, {
      state: BrazilState.RIO_DE_JANEIRO,
      city: City.BELFORD_ROXO,
    });
    const startDate = deadlineCalculator.getNextBusinessDay(new Date(deadlineData.intimationDate));
    const dueDate = deadlineCalculator.getDueDate(new Date(startDate), deadlineData.days);

    await deadlineService.create(deadlineData);

    expect(deadlineRepository.create).toHaveBeenCalledWith(deadlineData, startDate, dueDate);
  });

  test('should thow InvalidDeadlineTypeError if the type provided is invalid', async () => {
    const { deadlineService } = makeSut();
    const deadlineData = DeadlineMocker.mockCreateDeadlineDTO();
    deadlineData.type = 'banana';
    await expect(deadlineService.create(deadlineData)).rejects.toThrow(InvalidDeadlineTypeError);
  });

  test('should thow InvalidDeadlinePriorityError if the priority provided is invalid', async () => {
    const { deadlineService } = makeSut();
    const deadlineData = DeadlineMocker.mockCreateDeadlineDTO();
    deadlineData.priority = 'banana';
    await expect(deadlineService.create(deadlineData)).rejects.toThrow(
      InvalidDeadlinePriorityError
    );
  });

  test('should thow InvalidDateError if the intimationDate provided is invalid', async () => {
    const { deadlineService } = makeSut();
    const deadlineData = DeadlineMocker.mockCreateDeadlineDTO();
    deadlineData.intimationDate = 'banana';
    await expect(deadlineService.create(deadlineData)).rejects.toThrow(InvalidDateError);
  });

  test('should find all deadlines', async () => {
    const { deadlineService, deadlineRepository } = makeSut();
    await deadlineService.findAll();
    expect(deadlineRepository.findAll).toHaveBeenCalled();
  });

  test('should find deadline by id', async () => {
    const { deadlineService, deadlineRepository } = makeSut();
    const id = 'testid--fnsianf';
    await deadlineService.findById(id);
    expect(deadlineRepository.findById).toHaveBeenCalledWith(id);
  });

  test('should find deadline by case id', async () => {
    const { deadlineService, deadlineRepository } = makeSut();
    const id = 'testid--fnsianf';
    await deadlineService.findByCaseId(id);
    expect(deadlineRepository.findByCaseId).toHaveBeenCalledWith(id);
  });

  test('should call DeadlineRepository.updateById', async () => {
    const { deadlineService, deadlineRepository } = makeSut();
    const id = 'fakeIddfasfasd';
    await deadlineService.updateById(id, { priority: DeadlinePriority.ALTA });
    expect(deadlineRepository.updateById).toHaveBeenCalledWith(id, {
      priority: DeadlinePriority.ALTA,
    });
  });

  test('should call DeadlineRepository.deleteById', async () => {
    const { deadlineService, deadlineRepository } = makeSut();
    const id = 'fakeIddfasfasd';
    await deadlineService.deleteById(id);
    expect(deadlineRepository.deleteById).toHaveBeenCalledWith(id);
  });
});
