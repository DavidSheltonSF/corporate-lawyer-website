import { Types } from 'mongoose';
import { UserRole } from '../../types/UserRole';

export const fakeUserDatabase = [
  {
    _id: Types.ObjectId.createFromHexString('a3f9c1e70d4b8a2fff12ac90'),
    firstName: 'Flávia',
    lastName: 'Santiago',
    email: 'flavia@email.com',
    cpf: '11144744474',
    password: 'Flavia@123',
    role: UserRole.lawyer,
  },
  {
    _id: Types.ObjectId.createFromHexString('7e6d3b4a91c0deff1234abcd'),
    firstName: 'Carla',
    lastName: 'Medeiros',
    email: 'carla@email.com',
    cpf: '11148814474',
    password: 'Carla#456',
    role: UserRole.lawyer,
  },
  {
    _id: Types.ObjectId.createFromHexString('0f1e2d3c4b5a69788796a5b4'),
    firstName: 'Julia',
    lastName: 'Sílva',
    email: 'ju@email.com',
    cpf: '117897874474',
    password: 'Ju!78910',
    role: UserRole.client,
  },
  {
    _id: Types.ObjectId.createFromHexString('abcdef1234567890fedcba98'),
    firstName: 'Raimundo',
    lastName: 'Teixeira',
    email: 'raimundo@email.com',
    cpf: '18884744474',
    password: 'RaiMundo$1',
    role: UserRole.client,
  },
];
