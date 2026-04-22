import { DeadlineRepository } from '../../../repositories/DeadlineRepository';
import { mockDeadlineMongoDocs } from '../mockDeadlineMongoDocs';

export const createMockDeadlineRepository = (): DeadlineRepository => {
  return {
    create: jest.fn().mockResolvedValue(mockDeadlineMongoDocs[0]!),
    findById: jest.fn().mockResolvedValue(mockDeadlineMongoDocs[0]!),
    findByCaseId: jest.fn().mockResolvedValue(mockDeadlineMongoDocs),
    findAll: jest.fn().mockResolvedValue(mockDeadlineMongoDocs),
    deleteById: jest.fn().mockResolvedValue(mockDeadlineMongoDocs[0]!),
    updateById: jest.fn().mockResolvedValue(mockDeadlineMongoDocs[0]!),
    existsById: jest.fn().mockResolvedValue(true),
  };
};
