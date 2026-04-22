import { Types } from 'mongoose';
import { EntityAlreadyExistsError } from '../../errors/domain/EntityAlreadyExistsError';
import { InvalidEmailError } from '../../errors/domain/InvalidEmailError';
import { InvalidNameError } from '../../errors/domain/InvalidNameError';
import { createMockCaseRepository } from '../../tests/mocks/repositories/createMockCaseRepository';
import { createMockDeadlineRepository } from '../../tests/mocks/repositories/createMockDeadlineRepository';
import { DeadlineService } from './DeadlineService';
import { DeadlineType } from '../../types/DeadLineType';
import { DeadlineStatus } from '../../types/DeadLineStatus';
import { DeadlinePriority } from '../../types/DeadLinePriority';
import { InvalidDeadlineTypeError } from '../../errors/domain/InvalidDeadlineTypeError';
import { InvalidDeadlinePriorityError } from '../../errors/domain/InvalidDeadlinePriorityError';
import { InvalidDeadlineStatusError } from '../../errors/domain/InvalidDeadlineStatusError';

describe(`Test ${DeadlineService.name}`, () => {
  function makeSut() {
    const caseRepository = createMockCaseRepository();
    const deadlineRepository = createMockDeadlineRepository();
    const deadlineService = new DeadlineService(deadlineRepository, caseRepository);

    return {
      deadlineRepository,
      deadlineService,
    };
  }

  test('should call DeadlineRepository.create', async () => {
    const { deadlineService, deadlineRepository } = makeSut();

    const newDeadline = {
      caseId: Types.ObjectId.createFromTime(848484).toString(),
      clientId: Types.ObjectId.createFromTime(8484).toString(),
      type: DeadlineType.PAGAMENTO,
      startDate: '2050-02-02',
      dueDate: '2050-03-02',
      status: DeadlineStatus.EM_ANDAMENTO,
      priority: DeadlinePriority.ALTA,
    };

    await deadlineService.create(newDeadline);

    expect(deadlineRepository.create).toHaveBeenCalled();
  });

  test('should thow InvalidDeadlineTypeError if the type provided is invalid', async () => {
    const { deadlineService } = makeSut();

    const newDeadline = {
      caseId: Types.ObjectId.createFromTime(848484).toString(),
      clientId: Types.ObjectId.createFromTime(8484).toString(),
      type: 'banana',
      startDate: '2050-02-02',
      dueDate: '2050-03-02',
      status: DeadlineStatus.EM_ANDAMENTO,
      priority: DeadlinePriority.ALTA,
    };

    await expect(deadlineService.create(newDeadline)).rejects.toThrow(InvalidDeadlineTypeError);
  });

  test('should thow InvalidDeadlineStatusError if the status provided is invalid', async () => {
    const { deadlineService } = makeSut();

    const newDeadline = {
      caseId: Types.ObjectId.createFromTime(848484).toString(),
      clientId: Types.ObjectId.createFromTime(8484).toString(),
      type: DeadlineType.PAGAMENTO,
      startDate: '2050-02-02',
      dueDate: '2050-03-02',
      status: 'banana',
      priority: DeadlinePriority.ALTA,
    };

    await expect(deadlineService.create(newDeadline)).rejects.toThrow(InvalidDeadlineStatusError);
  });

  test('should thow InvalidDeadlinePriorityError if the priority provided is invalid', async () => {
    const { deadlineService } = makeSut();

    const newDeadline = {
      caseId: Types.ObjectId.createFromTime(848484).toString(),
      clientId: Types.ObjectId.createFromTime(8484).toString(),
      type: DeadlineType.PAGAMENTO,
      startDate: '2050-02-02',
      dueDate: '2050-03-02',
      status: DeadlineStatus.EM_ANDAMENTO,
      priority: 'banana',
    };

    await expect(deadlineService.create(newDeadline)).rejects.toThrow(InvalidDeadlinePriorityError);
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
