import { config } from 'dotenv';
import { DeadlineModel } from '../../../models/DeadlineModel';
import { MongodbDeadlineRepository } from './MongodbDeadlineRepository';
import { Types } from 'mongoose';
import { MongodbTestConnector } from '../MongodbTestConnector';
import { DeadlineType } from '../../../types/DeadLineType';
import { DeadlinePriority } from '../../../types/DeadLinePriority';
import { mockDeadlineMongoPersistence } from '../../../tests/mocks/mockDeadlineMongoPersistence';
import { DeadlineMocker } from '../../../tests/mocks/DeadlineMocker';
import { DeadlineStatus } from '../../../types/DeadLineStatus';
config();

jest.setTimeout(999999);

describe('Test DeadlineRepository', () => {
  let connection: MongodbTestConnector | null = null;
  beforeAll(async () => {
    connection = await MongodbTestConnector.connectAndReturn('deadline_repository_test');
  });

  beforeEach(async () => {
    await DeadlineModel.deleteMany({});
  });

  afterAll(async () => {
    await connection?.deleteDatabase();
    await connection?.disconnect();
  });

  function makeSut() {
    const deadlineRepository = new MongodbDeadlineRepository();

    return {
      deadlineRepository,
    };
  }

  test('should create a new deadline', async () => {
    const { deadlineRepository } = makeSut();

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const startDate = tomorrow;
    const dueDate = new Date(tomorrow.getDate() + 5);

    const deadlineData = DeadlineMocker.mockCreateDeadlineDTO();

    const deadline = await deadlineRepository.create(deadlineData, startDate, dueDate);
    const createdDeadline = await DeadlineModel.findById(deadline.id);
    expect(deadline).toEqual(expect.objectContaining(deadlineData));
    expect(createdDeadline?.caseId.toString()).toEqual(deadlineData.caseId);
    expect(createdDeadline?.lawyerId.toString()).toEqual(deadlineData.lawyerId);
    expect(createdDeadline?.intimationDate.toISOString()).toEqual(deadlineData.intimationDate);
    expect(createdDeadline?.days).toEqual(deadlineData.days);
    expect(createdDeadline?.startDate.toISOString()).toEqual(startDate.toISOString());
    expect(createdDeadline?.dueDate.toISOString()).toEqual(dueDate.toISOString());
    expect(createdDeadline?.type).toEqual(deadlineData.type);
    expect(createdDeadline?.priority).toEqual(deadlineData.priority);
  });

  test('should return deadlines with proper status', async () => {
    const { deadlineRepository } = makeSut();

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const pendingDeadlineStartDate = tomorrow;
    const pendingDeadlineDueDate = new Date(tomorrow.getDate() + 5);
    const pendingDeadlineDTO = DeadlineMocker.mockCreateDeadlineDTO();
    pendingDeadlineDTO.intimationDate = today.toISOString();
    pendingDeadlineDTO.days = 5;

    const openDeadlineStartDate = yesterday;
    const openDeadlineDueDate = tomorrow;
    const openDeadlineDTO = DeadlineMocker.mockCreateDeadlineDTO();
    openDeadlineDTO.intimationDate = new Date(yesterday.getDate() - 1).toISOString();
    openDeadlineDTO.days = 5;

    const expiredDeadlineStartDate = new Date('2026-04-01');
    const expiredDeadlineDueDate = new Date('2026-04-9');
    const expiredDeadlineDTO = DeadlineMocker.mockCreateDeadlineDTO();
    expiredDeadlineDTO.intimationDate = new Date('2026-04-01').toISOString();
    expiredDeadlineDTO.days = 5;

    const pendingDeadline = await deadlineRepository.create(
      pendingDeadlineDTO,
      pendingDeadlineStartDate,
      pendingDeadlineDueDate
    );
    const openDeadline = await deadlineRepository.create(
      openDeadlineDTO,
      openDeadlineStartDate,
      openDeadlineDueDate
    );
    const expiredDeadline = await deadlineRepository.create(
      expiredDeadlineDTO,
      expiredDeadlineStartDate,
      expiredDeadlineDueDate
    );

    expect(pendingDeadline.status).toBe(DeadlineStatus.PENDENTE);
    expect(openDeadline.status).toBe(DeadlineStatus.EM_ANDAMENTO);
    expect(expiredDeadline.status).toBe(DeadlineStatus.VENCIDO);
  });

  test('should find all deadlines', async () => {
    // I couldn't mock 'status' field properly since it is calculated using mongodb virtuals
    const { deadlineRepository } = makeSut();
    const deadlinePersistence1 = DeadlineMocker.mockDeadlineMongoPersistence();
    const deadlinePersistence2 = DeadlineMocker.mockDeadlineMongoPersistence();

    await DeadlineModel.create([deadlinePersistence1, deadlinePersistence2]);
    const deadlines = await deadlineRepository.findAll();

    expect(deadlines.length).toBe(2);
  });

  test('should find deadline by id', async () => {
    const { deadlineRepository } = makeSut();
    const deadlinePersistence = DeadlineMocker.mockDeadlineMongoPersistence();
    const newId = (await DeadlineModel.create(deadlinePersistence))._id;
    const deadline = await deadlineRepository.findById(newId.toString());

    if (!deadline) {
      throw Error('Deadline not found');
    }
    expect(deadline.lawyerId).toBe(deadlinePersistence?.lawyerId.toString());
    expect(deadline.caseId).toBe(deadlinePersistence?.caseId.toString());
    expect(deadline.intimationDate).toBe(deadlinePersistence?.intimationDate.toISOString());
    expect(deadline.startDate).toBe(deadlinePersistence?.startDate.toISOString());
    expect(deadline.dueDate).toBe(deadlinePersistence?.dueDate.toISOString());
    expect(deadline.type).toBe(deadlinePersistence?.type);
    expect(deadline.days).toBe(deadlinePersistence?.days);
    expect(deadline.priority).toBe(deadlinePersistence?.priority);
  });

  test('should find deadlines by case id', async () => {
    // I couldn't mock 'status' field properly since it is calculated using mongodb virtuals

    const { deadlineRepository } = makeSut();

    const deadlinePersistence = DeadlineMocker.mockDeadlineMongoPersistence();
    const otherCaseDeadlinePersistence = mockDeadlineMongoPersistence();

    await DeadlineModel.create(deadlinePersistence);
    await DeadlineModel.create(otherCaseDeadlinePersistence);

    const deadlines = await deadlineRepository.findByCaseId(deadlinePersistence.caseId.toString());

    expect(deadlines.length).toBe(1);
  });

  test('should delete a deadline', async () => {
    const { deadlineRepository } = makeSut();

    const deadlinePersistence = DeadlineMocker.mockDeadlineMongoPersistence();

    const deadlineId = (await DeadlineModel.create(deadlinePersistence))._id;

    const deadline = await deadlineRepository.deleteById(deadlineId.toString());

    expect(deadline?.lawyerId).toBe(deadlinePersistence?.lawyerId.toString());
    expect(deadline?.caseId).toBe(deadlinePersistence?.caseId.toString());
    expect(deadline?.intimationDate).toBe(deadlinePersistence?.intimationDate.toISOString());
    expect(deadline?.startDate).toBe(deadlinePersistence?.startDate.toISOString());
    expect(deadline?.dueDate).toBe(deadlinePersistence?.dueDate.toISOString());
    expect(deadline?.type).toBe(deadlinePersistence?.type);
    expect(deadline?.days).toBe(deadlinePersistence?.days);
    expect(deadline?.priority).toBe(deadlinePersistence?.priority);

    // Ensure deadline is actually deleted
    const deletedDeadline = await DeadlineModel.findById(deadlineId);
    expect(deletedDeadline).toBeNull();
  });

  test('should update a deadline', async () => {
    const { deadlineRepository } = makeSut();

    const deadlinePersistence = DeadlineMocker.mockDeadlineMongoPersistence();

    const deadlineId = (await DeadlineModel.create(deadlinePersistence))._id;

    const updatedData = {
      type: DeadlineType.REPLICA,
      priority: DeadlinePriority.BAIXA,
    };

    await deadlineRepository.updateById(deadlineId.toString(), updatedData);

    // Ensure deadline is actually updated
    const updatedDeadline = await DeadlineModel.findById(deadlineId);
    expect(updatedDeadline?.type).toBe(updatedData.type);
    expect(updatedDeadline?.priority).toBe(updatedData.priority);
  });

  test('should return true if deadline exists, but false if deadline does not exist', async () => {
    const { deadlineRepository } = makeSut();

    const deadlinePersistence = DeadlineMocker.mockDeadlineMongoPersistence();

    const newId = (await DeadlineModel.create(deadlinePersistence))._id;

    const existingDeadline = await deadlineRepository.existsById(newId.toString());
    const nonExistingDeadline = await deadlineRepository.existsById(
      Types.ObjectId.createFromTime(89466141).toString()
    );

    expect(existingDeadline).toBeTruthy();
    expect(nonExistingDeadline).toBeFalsy();
  });
});
