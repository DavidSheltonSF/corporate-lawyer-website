import { CaseRepository } from '../../../repositories/CaseRepository';
import { mockCaseMongoDocs } from '../mockCaseMongoDocs';

export const createMockCaseRepository = (): CaseRepository => {
  return {
    findById: jest.fn().mockResolvedValue(mockCaseMongoDocs[0]!),
    findCases: jest.fn().mockResolvedValue(mockCaseMongoDocs),
    create: jest.fn().mockResolvedValue(mockCaseMongoDocs[0]!),
    updateById: jest.fn().mockResolvedValue(mockCaseMongoDocs[0]!),
    getStats: jest.fn().mockResolvedValue({ inProgress: 2, closed: 3 }),
    getStatsByClientId: jest.fn().mockResolvedValue({ inProgress: 2, closed: 3 }),
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
