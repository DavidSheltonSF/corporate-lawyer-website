import { Types } from 'mongoose';
import { UserRepository } from '../../../repositories/UserRepository';
import { mockUserMongoDocs } from '../mockUserMongoDocs';
import { UserRole } from '../../../types/UserRole';

export const createMockUserRepository = (): UserRepository => {
  return {
    create: jest.fn().mockResolvedValue(mockUserMongoDocs[0]!),
    findById: jest.fn().mockResolvedValue(mockUserMongoDocs[0]!),
    findAll: jest.fn().mockResolvedValue(mockUserMongoDocs),
    findClients: jest.fn().mockResolvedValue([
      {
        _id: Types.ObjectId.createFromTime(48585555),
        firstName: 'José',
        lastName: 'Almeida',
        email: 'jo@email.com',
        cpf: '15588787855',
        password: 'jose123',
        role: UserRole.client,
      },
    ]),
    findByEmail: jest.fn().mockResolvedValue(mockUserMongoDocs[0]!),
    deleteById: jest.fn().mockResolvedValue(mockUserMongoDocs[0]!),
    updateById: jest.fn().mockResolvedValue(mockUserMongoDocs[0]!),
    existsById: jest.fn().mockResolvedValue(true),
    existsByEmail: jest.fn().mockResolvedValue(false),
  };
};
