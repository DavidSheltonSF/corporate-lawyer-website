import { WithMongoId } from '../../database/mongoDB/types/WithMongoId';
import { Mocker } from '../helpers/Mocker';
import { IUserModel } from '../../models/UserModel';
import { UserRole } from '../../types/UserRole';

export function mockUserMongoPersistence(): WithMongoId<IUserModel> {
  return {
    _id: Mocker.mockMongoId(),
    firstName: Mocker.mockName(),
    lastName: Mocker.mockName(),
    email: Mocker.mockEmail(),
    cpf: Mocker.mockCpf(),
    password: Mocker.mockPassword(),
    role: Mocker.mockEnum(UserRole),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
