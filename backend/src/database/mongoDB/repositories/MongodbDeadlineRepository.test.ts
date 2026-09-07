import { DeadlineModel } from '../../../models/DeadlineModel';
import { MongodbDeadlineRepository } from './MongodbDeadlineRepository';
import { DeadlineType } from '../../../types/DeadLineType';
import { DeadlinePriority } from '../../../types/DeadLinePriority';
import { DeadlineMocker } from '../../../tests/mocks/entities/DeadlineMocker';
import { DeadlineStatus } from '../../../types/DeadLineStatus';
import { MongodbConnector } from '../MongodbConnector';
import { CaseLocationDTO } from '../../../dtos/case/CaseLocationDTO';
import { BrazilState } from '../../../types/BrazilState';
import { City } from '../../../types/City';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { GenericMocker } from '../../../tests/mocks/fields/GenericMocker';
import { toDateOnlyString } from '../../../utils/toDateOnly';

describe('Test DeadlineRepository', () => {
  let connection: MongodbConnector | null = null;
  beforeAll(async () => {
    connection = await MongodbConnector.connectAndReturn();
  });

  beforeEach(async () => {
    await DeadlineModel.deleteMany({});
  });

  afterAll(async () => {
    await connection?.disconnect();
  });

  function makeSut() {
    const deadlineRepository = new MongodbDeadlineRepository();
    const caseLocation: CaseLocationDTO = {
      state: BrazilState.RIO_DE_JANEIRO,
      city: City.BELFORD_ROXO,
    };

    return {
      deadlineRepository,
      caseLocation,
    };
  }

  describe('create', () => {
    it('should create a new deadline', async () => {
      const { deadlineRepository, caseLocation } = makeSut();

      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const startDate = toDateOnlyString(tomorrow);
      const dueDate = toDateOnlyString(new Date(tomorrow.getDate() + 5));

      const deadlineData = DeadlineMocker.mockCreateDeadlineDTO();

      const deadline = await deadlineRepository.create(
        deadlineData,
        startDate.toString(),
        dueDate.toString(),
        caseLocation
      );

      const createdDeadline = await DeadlineModel.findById(deadline.id);

      expect(deadline).toMatchObject(deadlineData);
      expect(createdDeadline?.caseId.toString()).toEqual(deadlineData.caseId);
      expect(createdDeadline?.lawyerId.toString()).toEqual(deadlineData.lawyerId);
      expect(createdDeadline?.intimationDate).toEqual(deadlineData.intimationDate);
      expect(createdDeadline?.days).toEqual(deadlineData.days);
      expect(createdDeadline?.startDate).toEqual(startDate);
      expect(createdDeadline?.dueDate).toEqual(dueDate);
      expect(createdDeadline?.type).toEqual(deadlineData.type);
      expect(createdDeadline?.priority).toEqual(deadlineData.priority);
    });

    it('should return deadlines with proper status', async () => {
      const { deadlineRepository, caseLocation } = makeSut();

      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const pendingDeadlineStartDate = toDateOnlyString(tomorrow);
      const pendingDeadlineDueDate = toDateOnlyString(new Date(tomorrow.getDate() + 5));
      const pendingDeadlineDTO = DeadlineMocker.mockCreateDeadlineDTO();
      pendingDeadlineDTO.intimationDate = today.toISOString();
      pendingDeadlineDTO.days = 5;

      const openDeadlineStartDate = toDateOnlyString(yesterday);
      const openDeadlineDueDate = toDateOnlyString(tomorrow);
      const openDeadlineDTO = DeadlineMocker.mockCreateDeadlineDTO();
      openDeadlineDTO.intimationDate = new Date(yesterday.getDate() - 1).toISOString();
      openDeadlineDTO.days = 5;

      const expiredDeadlineStartDate = toDateOnlyString(new Date('2026-04-01'));
      const expiredDeadlineDueDate = toDateOnlyString(new Date('2026-04-9'));
      const expiredDeadlineDTO = DeadlineMocker.mockCreateDeadlineDTO();
      expiredDeadlineDTO.intimationDate = new Date('2026-04-01').toISOString();
      expiredDeadlineDTO.days = 5;

      const pendingDeadline = await deadlineRepository.create(
        pendingDeadlineDTO,
        pendingDeadlineStartDate,
        pendingDeadlineDueDate,
        caseLocation
      );
      const openDeadline = await deadlineRepository.create(
        openDeadlineDTO,
        openDeadlineStartDate,
        openDeadlineDueDate,
        caseLocation
      );
      const expiredDeadline = await deadlineRepository.create(
        expiredDeadlineDTO,
        expiredDeadlineStartDate,
        expiredDeadlineDueDate,
        caseLocation
      );

      expect(pendingDeadline.status).toBe(DeadlineStatus.PENDENTE);
      expect(openDeadline.status).toBe(DeadlineStatus.EM_ANDAMENTO);
      expect(expiredDeadline.status).toBe(DeadlineStatus.VENCIDO);
    });
  });

  describe('findAll', () => {
    it('should find all deadlines', async () => {
      // I couldn't mock 'status' field properly since it is calculated using mongodb virtuals
      const { deadlineRepository } = makeSut();
      const deadlinePersistence1 = DeadlineMocker.mockDeadlineMongoPersistence();
      const deadlinePersistence2 = DeadlineMocker.mockDeadlineMongoPersistence();

      await DeadlineModel.create([deadlinePersistence1, deadlinePersistence2]);
      const deadlines = await deadlineRepository.findAll();

      expect(deadlines.length).toBe(2);
    });
  });

  describe('findById', () => {
    it('should find deadline by id', async () => {
      const { deadlineRepository } = makeSut();
      const deadlinePersistence = DeadlineMocker.mockDeadlineMongoPersistence();
      const newId = (await DeadlineModel.create(deadlinePersistence))._id;
      const deadline = await deadlineRepository.findById(newId.toString());

      expect(deadline?.lawyerId).toBe(deadlinePersistence?.lawyerId.toString());
      expect(deadline?.caseId).toBe(deadlinePersistence?.caseId.toString());
      expect(deadline?.intimationDate).toBe(deadlinePersistence?.intimationDate);
      expect(deadline?.startDate).toBe(deadlinePersistence?.startDate);
      expect(deadline?.dueDate).toBe(deadlinePersistence?.dueDate);
      expect(deadline?.type).toBe(deadlinePersistence?.type);
      expect(deadline?.days).toBe(deadlinePersistence?.days);
      expect(deadline?.priority).toBe(deadlinePersistence?.priority);
    });
  });

  describe('findByCaseId', () => {
    it('should find deadlines by case id', async () => {
      // I couldn't mock 'status' field properly since it is calculated using mongodb virtuals
      const { deadlineRepository } = makeSut();
      const deadline1 = DeadlineMocker.mockDeadlineMongoPersistence();
      const deadline2 = DeadlineMocker.mockDeadlineMongoPersistence();
      await DeadlineModel.create(deadline1);
      await DeadlineModel.create(deadline2);
      const deadlines = await deadlineRepository.findByCaseId(deadline1.caseId.toString());
      const foundDeadline = deadlines[0];

      expect(foundDeadline?.caseId.toString()).toBe(deadline1.caseId.toString());
    });
  });

  describe('deleteById', () => {
    it('should delete a deadline', async () => {
      const { deadlineRepository } = makeSut();

      const deadline = DeadlineMocker.mockDeadlineMongoPersistence();
      const deadlineId = (await DeadlineModel.create(deadline))._id;
      const deletedDeadline = await deadlineRepository.deleteById(deadlineId.toString());

      expect(deletedDeadline?.lawyerId).toBe(deadline?.lawyerId.toString());
      expect(deletedDeadline?.caseId).toBe(deadline?.caseId.toString());
      expect(deletedDeadline?.intimationDate).toBe(deadline?.intimationDate);
      expect(deletedDeadline?.startDate).toBe(deadline?.startDate);
      expect(deletedDeadline?.dueDate).toBe(deadline?.dueDate);
      expect(deletedDeadline?.type).toBe(deadline?.type);
      expect(deletedDeadline?.days).toBe(deadline?.days);
      expect(deletedDeadline?.priority).toBe(deadline?.priority);

      // Ensure deadline is actually deleted
      const foundDeadline = await DeadlineModel.findById(deadlineId);
      expect(foundDeadline).toBeNull();
    });
  });

  describe('updateById', () => {
    it('should update a deadline', async () => {
      const { deadlineRepository } = makeSut();

      const deadline = DeadlineMocker.mockDeadlineMongoPersistence();
      const deadlineId = (await DeadlineModel.create(deadline))._id;
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
  });

  describe('existsById', () => {
    it('should return true if deadline exists, but false if deadline does not exist', async () => {
      const { deadlineRepository } = makeSut();
      const deadline = DeadlineMocker.mockDeadlineMongoPersistence();
      const newId = (await DeadlineModel.create(deadline))._id;
      const existingDeadline = await deadlineRepository.existsById(newId.toString());
      const nonExistingDeadline = await deadlineRepository.existsById(
        GenericMocker.mockMongoId().toString()
      );
      expect(existingDeadline).toBeTruthy();
      expect(nonExistingDeadline).toBeFalsy();
    });
  });
});
