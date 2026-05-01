import { CaseRepository } from '../../../repositories/CaseRepository';
import { CaseMocker } from '../CaseMoker';

export const createMockCaseRepository = (): CaseRepository => {
  return {
    findById: jest.fn().mockResolvedValue(CaseMocker.mockCaseDTOWithId()),
    findAll: jest
      .fn()
      .mockResolvedValue([CaseMocker.mockCaseDTOWithId(), CaseMocker.mockCaseDTOWithId()]),
    findPopulatedByClientId: jest
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
    addFile: jest.fn().mockResolvedValue(undefined),
    findFilesByCaseId: jest.fn().mockResolvedValue([
      {
        _id: 'ffdsfsfa',
        name: 'File',
        url: 'www.url.com',
        mimeType: 'application/pdf',
        size: 200,
        uploadedBy: 'sdfdsfdsgrsgadsf',
        uploadedAt: new Date(),
      },
    ]),
  };
};
