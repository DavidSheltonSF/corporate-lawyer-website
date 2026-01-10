import { Types } from 'mongoose';
import { IUserModel } from '../../models/UserModel';
import { WithMongoId } from '../../database/types/WithMongoId';
import { UserRole } from '../../types/UserRole';

export const mockUserMongoDocs: WithMongoId<IUserModel>[] = [
  {
    _id: Types.ObjectId.createFromTime(48585555),
    firstName: 'José',
    lastName: 'Almeida',
    email: 'jo@email.com',
    cpf: '15588787855',
    password: 'jose123',
    role: UserRole.admin,
  },
];
