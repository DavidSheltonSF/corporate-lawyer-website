import { UserRepository } from '../../../repositories/UserRepository';
import { mockUserMongoDocs } from '../mockUserMongoDocs';

export const createMockUserRepository = (): UserRepository => {
  return {
    findById: jest.fn().mockResolvedValue(mockUserMongoDocs[0]!),
    findAll: jest.fn().mockResolvedValue(mockUserMongoDocs),
    findByEmail: jest.fn().mockResolvedValue(mockUserMongoDocs[0]!),
    create: jest.fn().mockResolvedValue(mockUserMongoDocs[0]!),
    exists: jest.fn().mockResolvedValue(true)
  };
};
