import { CaseRepository } from '../../../repositories/CaseRepository';
import { CaseMocker } from '../entities/CaseMoker';

export const mockCaseRepository = (): CaseRepository => {
  return {
    findById: jest.fn().mockResolvedValue(CaseMocker.mockCaseDTOWithId()),
    findAll: jest
      .fn()
      .mockResolvedValue([CaseMocker.mockCaseDTOWithId(), CaseMocker.mockCaseDTOWithId()]),
    findPopulatedById: jest.fn().mockResolvedValue(CaseMocker.mockCaseDTOWithId()),
    create: jest.fn().mockResolvedValue(CaseMocker.mockCaseDTOWithId()),
    updateById: jest.fn().mockResolvedValue(CaseMocker.mockCaseDTOWithId()),
    getStats: jest.fn().mockResolvedValue({ inProgress: 2, closed: 3 }),
    getStatsByClientId: jest.fn().mockResolvedValue({ inProgress: 2, closed: 3 }),
    deleteById: jest.fn().mockResolvedValue(true),
    deleteByUserId: jest.fn().mockResolvedValue({
      acknowledged: true,
      deletedCount: 3,
    }),
    exists: jest.fn().mockResolvedValue(true),
  };
};
