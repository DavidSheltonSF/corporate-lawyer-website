import { Types } from 'mongoose';
import { UserRole } from '../../types/UserRole';

export const fakeUserDatabase = [
  {
    _id: Types.ObjectId.createFromTime(15258484),
    firstName: 'Flávia',
    lastName: 'Santiago',
    email: 'flavia@email.com',
    cpf: '11144744474',
    password: 'flavia123',
    role: UserRole.lawyer,
  },
  {
    _id: Types.ObjectId.createFromTime(5845131942),
    firstName: 'Carla',
    lastName: 'Medeiros',
    email: 'carla@email.com',
    cpf: '11148814474',
    password: 'carla123',
    role: UserRole.lawyer,
  },
  {
    _id: Types.ObjectId.createFromTime(5845444442),
    firstName: 'Julia',
    lastName: 'Sílva',
    email: 'ju@email.com',
    cpf: '117897874474',
    password: 'ju123',
    role: UserRole.client,
  },
  {
    _id: Types.ObjectId.createFromTime(3115151),
    firstName: 'Raimundo',
    lastName: 'Teixeira',
    email: 'raimundo@email.com',
    cpf: '18884744474',
    password: 'raimundo123',
    role: UserRole.client,
  },
];
