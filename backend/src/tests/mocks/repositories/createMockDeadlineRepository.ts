import { DeadlineRepository } from '../../../repositories/DeadlineRepository';
import { mockDeadlineMongoPersistence } from '../mockDeadlineMongoPersistence';

export const createMockDeadlineRepository = (): DeadlineRepository => {
  return {
    create: jest.fn().mockResolvedValue(mockDeadlineMongoPersistence()),
    findById: jest.fn().mockResolvedValue(mockDeadlineMongoPersistence()),
    findByCaseId: jest
      .fn()
      .mockResolvedValue([mockDeadlineMongoPersistence(), mockDeadlineMongoPersistence()]),
    findAll: jest
      .fn()
      .mockResolvedValue([mockDeadlineMongoPersistence(), mockDeadlineMongoPersistence()]),
    deleteById: jest.fn().mockResolvedValue(mockDeadlineMongoPersistence()),
    updateById: jest.fn().mockResolvedValue(mockDeadlineMongoPersistence()),
    existsById: jest.fn().mockResolvedValue(true),
  };
};
