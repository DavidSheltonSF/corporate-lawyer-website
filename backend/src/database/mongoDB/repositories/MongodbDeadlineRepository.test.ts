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

    const deadlineDTO = {
      caseId: Types.ObjectId.createFromTime(848484).toString(),
      lawyerId: Types.ObjectId.createFromTime(8484).toString(),
      type: DeadlineType.PAGAMENTO,
      startDate: '2050-02-02',
      dueDate: '2050-03-02',
      status: DeadlineStatus.EM_ANDAMENTO,
      priority: DeadlinePriority.ALTA,
    };

    const deadline = await deadlineRepository.create(deadlineDTO);
    expect(deadline.caseId.toString()).toBe(deadlineDTO.caseId.toString());
    expect(deadline.lawyerId.toString()).toBe(deadlineDTO.lawyerId.toString());
    expect(deadline.type).toBe(deadlineDTO.type);
    expect(deadline.status).toBe(deadlineDTO.status);
    expect(deadline.priority).toBe(deadlineDTO.priority);
  });

  test('should find deadline all deadlines', async () => {
    const { deadlineRepository } = makeSut();
    const newDeadlines = [
      {
        caseId: Types.ObjectId.createFromTime(848484).toString(),
        lawyerId: Types.ObjectId.createFromTime(8484).toString(),
        type: DeadlineType.PAGAMENTO,
        startDate: new Date('2050-02-02').toString(),
        dueDate: new Date('2050-03-02').toString(),
        status: DeadlineStatus.EM_ANDAMENTO,
        priority: DeadlinePriority.ALTA,
      },
      {
        caseId: Types.ObjectId.createFromTime(8484).toString(),
        lawyerId: Types.ObjectId.createFromTime(847774).toString(),
        type: DeadlineType.CONTESTACAO,
        startDate: new Date('2050-02-02').toString(),
        dueDate: new Date('2050-03-02').toString(),
        status: DeadlineStatus.CONCLUIDO,
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

    const newDeadline = {
      caseId: Types.ObjectId.createFromTime(848484).toString(),
      lawyerId: Types.ObjectId.createFromTime(8484).toString(),
      type: DeadlineType.PAGAMENTO,
      startDate: new Date('2050-02-02').toString(),
      dueDate: new Date('2050-03-02').toString(),
      status: DeadlineStatus.EM_ANDAMENTO,
      priority: DeadlinePriority.ALTA,
    };

    const newId = (await DeadlineModel.create(newDeadline))._id;

    const deadline = await deadlineRepository.findById(newId.toString());

    if (!deadline) {
      throw Error('Deadline not found');
    }
    expect(deadline).toEqual(expect.objectContaining(newDeadline));

  });

  test('should find deadlines by case id', async () => {
    const { deadlineRepository } = makeSut();

    const newDeadline = {
      caseId: Types.ObjectId.createFromTime(848484).toString(),
      lawyerId: Types.ObjectId.createFromTime(8484).toString(),
      type: DeadlineType.PAGAMENTO,
      startDate: new Date('2050-02-02').toString(),
      dueDate: new Date('2050-03-02').toString(),
      status: DeadlineStatus.EM_ANDAMENTO,
      priority: DeadlinePriority.ALTA,
    };

    const otherCaseDeadline = {
      caseId: Types.ObjectId.createFromTime(8484884613614).toString(),
      lawyerId: Types.ObjectId.createFromTime(8484).toString(),
      type: DeadlineType.PAGAMENTO,
      startDate: new Date('2050-02-02').toString(),
      dueDate: new Date('2050-03-02').toString(),
      status: DeadlineStatus.EM_ANDAMENTO,
      priority: DeadlinePriority.ALTA,
    };

    await DeadlineModel.create(newDeadline);
    await DeadlineModel.create(otherCaseDeadline);

    const deadlines = await deadlineRepository.findByCaseId(newDeadline.caseId.toString());

    expect(deadlines).toContainEqual(expect.objectContaining(newDeadline));
    expect(deadlines).not.toContainEqual(expect.objectContaining(otherCaseDeadline));
  });

  test('should delete a deadline', async () => {
    const { deadlineRepository } = makeSut();

    const newDeadline = {
      caseId: Types.ObjectId.createFromTime(848484).toString(),
      lawyerId: Types.ObjectId.createFromTime(8484).toString(),
      type: DeadlineType.PAGAMENTO,
      startDate: new Date('2050-02-02').toString(),
      dueDate: new Date('2050-03-02').toString(),
      status: DeadlineStatus.EM_ANDAMENTO,
      priority: DeadlinePriority.ALTA,
    };

    const deadlineId = (await DeadlineModel.create(newDeadline))._id;

    const result = await deadlineRepository.deleteById(deadlineId.toString());

    expect(result).toEqual(expect.objectContaining(newDeadline));

    // Ensure deadline is actually deleted
    const deletedDeadline = await DeadlineModel.findById(deadlineId);
    expect(deletedDeadline).toBeNull();
  });

  test('should update a deadline', async () => {
    const { deadlineRepository } = makeSut();

    const newDeadline = {
      caseId: Types.ObjectId.createFromTime(848484).toString(),
      lawyerId: Types.ObjectId.createFromTime(8484).toString(),
      type: DeadlineType.PAGAMENTO,
      startDate: new Date('2050-02-02').toString(),
      dueDate: new Date('2050-03-02').toString(),
      status: DeadlineStatus.EM_ANDAMENTO,
      priority: DeadlinePriority.ALTA,
    };

    const deadlineId = (await DeadlineModel.create(newDeadline))._id;

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

    const newDeadline = {
      caseId: Types.ObjectId.createFromTime(848484).toString(),
      lawyerId: Types.ObjectId.createFromTime(8484).toString(),
      type: DeadlineType.PAGAMENTO,
      startDate: new Date('2050-02-02').toString(),
      dueDate: new Date('2050-03-02').toString(),
      status: DeadlineStatus.EM_ANDAMENTO,
      priority: DeadlinePriority.ALTA,
    };

    const newId = (await DeadlineModel.create(newDeadline))._id;

    const existingDeadline = await deadlineRepository.existsById(newId.toString());
    const nonExistingDeadline = await deadlineRepository.existsById(
      Types.ObjectId.createFromTime(89466141).toString()
    );

    expect(existingDeadline).toBeTruthy();
    expect(nonExistingDeadline).toBeFalsy();
  });
});
