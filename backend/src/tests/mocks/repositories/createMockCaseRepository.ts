import { CaseRepository } from '../../../repositories/CaseRepository';
import { mockCaseMongoDocs } from '../mockCaseMongoDocs';

export const createMockCaseRepository = (): CaseRepository => {
  return {
    findById: jest.fn().mockResolvedValue(mockCaseMongoDocs[0]!),
    findCaseCards: jest.fn().mockResolvedValue(mockCaseMongoDocs),
    create: jest.fn().mockResolvedValue(mockCaseMongoDocs[0]!),
    getStats: jest.fn().mockResolvedValue({ inProgress: 2, closed: 3 }),
    exists: jest.fn().mockResolvedValue(true),
    addFile: jest.fn().mockResolvedValue({
      _id: 'ffdsfsfa',
      name: 'File',
      url: 'www.url.com',
      mimeType: 'application/pdf',
      size: 200,
      uploadedBy: 'sdfdsfdsgrsgadsf',
      uploadedAt: new Date(),
    }),
  };
};
