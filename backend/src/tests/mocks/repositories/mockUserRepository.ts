import { Types } from 'mongoose';
import { UserRepository } from '../../../repositories/UserRepository';
import { UserRole } from '../../../types/UserRole';
import { UserMocker } from '../entities/UserMocker';

export const mockUserRepository = (): UserRepository => {
  return {
    create: jest.fn().mockResolvedValue(UserMocker.mockUserDTOWithId()),
    findById: jest.fn().mockResolvedValue(UserMocker.mockUserDTOWithId()),
    findAll: jest
      .fn()
      .mockResolvedValue([UserMocker.mockUserDTOWithId(), UserMocker.mockUserDTOWithId()]),
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
    findByEmail: jest.fn().mockResolvedValue(UserMocker.mockUserDTOWithId()),
    deleteById: jest.fn().mockResolvedValue(UserMocker.mockUserDTOWithId()),
    updateById: jest.fn().mockResolvedValue(UserMocker.mockUserDTOWithId()),
    existsById: jest.fn().mockResolvedValue(true),
    existsByEmail: jest.fn().mockResolvedValue(false),
  };
};
