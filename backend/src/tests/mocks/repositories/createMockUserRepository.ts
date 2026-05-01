import { Types } from 'mongoose';
import { UserRepository } from '../../../repositories/UserRepository';
import { UserRole } from '../../../types/UserRole';
import { CasesStatus } from '../../../types/CasesStatus';
import { UserMocker } from '../UserMocker';

export const createMockUserRepository = (): UserRepository => {
  return {
    create: jest.fn().mockResolvedValue(UserMocker.mockUserDTOWithId()),
    findById: jest.fn().mockResolvedValue(UserMocker.mockUserDTOWithId()),
    findByIdWithCases: jest.fn().mockResolvedValue({
      _id: Types.ObjectId.createFromTime(48585555),
      firstName: 'José',
      lastName: 'Almeida',
      email: 'jo@email.com',
      cpf: '15588787855',
      password: 'jose123',
      role: UserRole.admin,
      cases: [
        {
          id: Types.ObjectId.createFromTime(485855),
          client: Types.ObjectId.createFromTime(45855),
          court: 'STJ',
          courtDivision: 'Família',
          description: 'Fake description',
          lawyers: [Types.ObjectId.createFromTime(488888)],
          processNumber: '2254787-55.5877.1.55.4787', //NNNNNNN-DD.AAAA.J.TR.OOOO,
          status: CasesStatus.open,
          title: 'Case Title',
        },
      ],
    }),
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
