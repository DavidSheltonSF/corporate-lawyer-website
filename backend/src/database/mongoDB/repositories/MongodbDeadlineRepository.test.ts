import { config } from 'dotenv';
import { DeadlineModel } from '../../../models/DeadlineModel';
import { MongodbDeadlineRepository } from './MongodbDeadlineRepository';
import { Types } from 'mongoose';
import { MongodbTestConnector } from '../MongodbTestConnector';
import { DeadlineType } from '../../../types/DeadLineType';
import { DeadlineStatus } from '../../../types/DeadLineStatus';
import { DeadlinePriority } from '../../../types/DeadLinePriority';
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
    const deadlineDTO = {
      caseId: Types.ObjectId.createFromTime(823775684).toString(),
      lawyerId: Types.ObjectId.createFromTime(872576365).toString(),
      type: DeadlineType.PAGAMENTO,
      intimationDate: today.toISOString(),
      days: 5,

      priority: DeadlinePriority.ALTA,
    };

    const deadline = await deadlineRepository.create(deadlineDTO, startDate, dueDate);
    const createdDeadline = await DeadlineModel.findById(deadline.id);
    expect(deadline).toEqual(expect.objectContaining(deadlineDTO));
    expect(createdDeadline?.caseId.toString()).toEqual(deadlineDTO.caseId);
    expect(createdDeadline?.lawyerId.toString()).toEqual(deadlineDTO.lawyerId);
    expect(createdDeadline?.intimationDate.toISOString()).toEqual(deadlineDTO.intimationDate);
    expect(createdDeadline?.days).toEqual(deadlineDTO.days);
    expect(createdDeadline?.startDate.toISOString()).toEqual(startDate.toISOString());
    expect(createdDeadline?.dueDate.toISOString()).toEqual(dueDate.toISOString());
    expect(createdDeadline?.type).toEqual(deadlineDTO.type);
    expect(createdDeadline?.priority).toEqual(deadlineDTO.priority);
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
    const pendingDeadlineDTO = {
      caseId: Types.ObjectId.createFromTime(823775684).toString(),
      lawyerId: Types.ObjectId.createFromTime(872576365).toString(),
      type: DeadlineType.PAGAMENTO,
      intimationDate: today.toISOString(),

      days: 5,
      priority: DeadlinePriority.ALTA,
    };

    const openDeadlineStartDate = yesterday;
    const openDeadlineDueDate = tomorrow;
    const openDeadlineDTO = {
      caseId: Types.ObjectId.createFromTime(877273333484).toString(),
      lawyerId: Types.ObjectId.createFromTime(555584).toString(),
      type: DeadlineType.PAGAMENTO,
      intimationDate: new Date(yesterday.getDate() - 1).toISOString(), // 1 days before yesterday
      days: 2,
      priority: DeadlinePriority.ALTA,
    };

    const expiredDeadlineStartDate = new Date('2026-04-01');
    const expiredDeadlineDueDate = new Date('2026-04-9');
    const expiredDeadlineDTO = {
      caseId: Types.ObjectId.createFromTime(848484).toString(),
      lawyerId: Types.ObjectId.createFromTime(8484).toString(),
      type: DeadlineType.PAGAMENTO,
      intimationDate: new Date('2026-04-01').toISOString(),
      days: 5,
      priority: DeadlinePriority.ALTA,
    };

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

  test('should find deadline all deadlines', async () => {
    const { deadlineRepository } = makeSut();
    const newDeadlines = [
      {
        caseId: Types.ObjectId.createFromTime(87484).toString(),
        lawyerId: Types.ObjectId.createFromTime(8884).toString(),
        type: DeadlineType.PAGAMENTO,
        intimationDate: new Date('2026-03-01').toISOString(),
        startDate: new Date('2026-03-08').toISOString(),
        dueDate: new Date('2026-03-28').toISOString(),
        days: 5,
        priority: DeadlinePriority.BAIXA,
      },
      {
        caseId: Types.ObjectId.createFromTime(822584).toString(),
        lawyerId: Types.ObjectId.createFromTime(28557).toString(),
        type: DeadlineType.OUTRO,
        intimationDate: new Date('2026-02-01').toISOString(),
        startDate: new Date('2026-02-27').toISOString(),
        dueDate: new Date('2026-02-28').toISOString(),
        days: 5,
        priority: DeadlinePriority.ALTA,
      },
    ];

    await DeadlineModel.create(newDeadlines);

    const deadlines = await deadlineRepository.findAll();

    expect(deadlines).toContainEqual(expect.objectContaining(newDeadlines[0]));
    expect(deadlines).toContainEqual(expect.objectContaining(newDeadlines[1]));
  });

  test('should find deadline by id', async () => {
    const { deadlineRepository } = makeSut();

    const deadlineDTO = {
      caseId: Types.ObjectId.createFromTime(848484).toString(),
      lawyerId: Types.ObjectId.createFromTime(8484).toString(),
      type: DeadlineType.PAGAMENTO,
      intimationDate: new Date('2026-04-01').toISOString(),
      startDate: new Date('2026-04-27').toISOString(),
      dueDate: new Date('2026-04-28').toISOString(),
      days: 5,
      priority: DeadlinePriority.ALTA,
    };

    const newId = (await DeadlineModel.create(deadlineDTO))._id;

    const deadline = await deadlineRepository.findById(newId.toString());

    if (!deadline) {
      throw Error('Deadline not found');
    }
    expect(deadline).toEqual(expect.objectContaining(deadlineDTO));
  });

  test('should find deadlines by case id', async () => {
    const { deadlineRepository } = makeSut();

    const deadlineDTO = {
      caseId: Types.ObjectId.createFromTime(848484).toString(),
      lawyerId: Types.ObjectId.createFromTime(8484).toString(),
      type: DeadlineType.PAGAMENTO,
      intimationDate: new Date('2026-04-01').toISOString(),
      startDate: new Date('2026-04-27').toISOString(),
      dueDate: new Date('2026-04-28').toISOString(),
      days: 5,
      priority: DeadlinePriority.ALTA,
    };

    const otherCaseDeadline = {
      caseId: Types.ObjectId.createFromTime(847777).toString(),
      lawyerId: Types.ObjectId.createFromTime(88777).toString(),
      type: DeadlineType.PAGAMENTO,
      intimationDate: new Date('2026-04-01').toISOString(),
      startDate: new Date('2026-04-27').toISOString(),
      dueDate: new Date('2026-04-28').toISOString(),
      days: 5,
      priority: DeadlinePriority.ALTA,
    };

    await DeadlineModel.create(deadlineDTO);
    await DeadlineModel.create(otherCaseDeadline);

    const deadlines = await deadlineRepository.findByCaseId(deadlineDTO.caseId.toString());

    expect(deadlines).toContainEqual(expect.objectContaining(deadlineDTO));
    expect(deadlines).not.toContainEqual(expect.objectContaining(otherCaseDeadline));
  });

  test('should delete a deadline', async () => {
    const { deadlineRepository } = makeSut();

    const deadlineDTO = {
      caseId: Types.ObjectId.createFromTime(848484).toString(),
      lawyerId: Types.ObjectId.createFromTime(8484).toString(),
      type: DeadlineType.PAGAMENTO,
      intimationDate: new Date('2026-04-01').toISOString(),
      startDate: new Date('2026-04-27').toISOString(),
      dueDate: new Date('2026-04-28').toISOString(),
      days: 5,
      priority: DeadlinePriority.ALTA,
    };

    const deadlineId = (await DeadlineModel.create(deadlineDTO))._id;

    const result = await deadlineRepository.deleteById(deadlineId.toString());

    expect(result).toEqual(expect.objectContaining(deadlineDTO));

    // Ensure deadline is actually deleted
    const deletedDeadline = await DeadlineModel.findById(deadlineId);
    expect(deletedDeadline).toBeNull();
  });

  test('should update a deadline', async () => {
    const { deadlineRepository } = makeSut();

    const deadlineDTO = {
      caseId: Types.ObjectId.createFromTime(848484).toString(),
      lawyerId: Types.ObjectId.createFromTime(8484).toString(),
      type: DeadlineType.PAGAMENTO,
      intimationDate: new Date('2026-04-01').toISOString(),
      startDate: new Date('2026-04-27').toISOString(),
      dueDate: new Date('2026-04-28').toISOString(),
      days: 5,
      priority: DeadlinePriority.ALTA,
    };

    const deadlineId = (await DeadlineModel.create(deadlineDTO))._id;

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

    const deadlineDTO = {
      caseId: Types.ObjectId.createFromTime(848484).toString(),
      lawyerId: Types.ObjectId.createFromTime(8484).toString(),
      type: DeadlineType.PAGAMENTO,
      intimationDate: new Date('2026-04-01').toISOString(),
      startDate: new Date('2026-04-27').toISOString(),
      dueDate: new Date('2026-04-28').toISOString(),
      days: 5,
      priority: DeadlinePriority.ALTA,
    };

    const newId = (await DeadlineModel.create(deadlineDTO))._id;

    const existingDeadline = await deadlineRepository.existsById(newId.toString());
    const nonExistingDeadline = await deadlineRepository.existsById(
      Types.ObjectId.createFromTime(89466141).toString()
    );

    expect(existingDeadline).toBeTruthy();
    expect(nonExistingDeadline).toBeFalsy();
  });
});
