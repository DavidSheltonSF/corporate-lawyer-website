import { CaseRepository } from '../../../repositories/CaseRepository';
import { mockCaseMongoDocs } from '../mockCaseMongoDocs';

export const createMockCaseRepository = (): CaseRepository => {
  return {
    findById: jest.fn().mockResolvedValue(mockCaseMongoDocs[0]!),
    findCaseCards: jest.fn().mockResolvedValue(mockCaseMongoDocs),
    create: jest.fn().mockResolvedValue(mockCaseMongoDocs[0]!),
    getStats: jest.fn().mockResolvedValue({ inProgress: 2, closed: 3 }),
  };
};
