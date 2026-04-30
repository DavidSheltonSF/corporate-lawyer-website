import { WithMongoId } from '../../database/mongoDB/types/WithMongoId';
import { Mocker } from '../helpers/Mocker';
import { IUserModel } from '../../models/UserModel';
import { UserRole } from '../../types/UserRole';
import { UserFieldsMocker } from '../helpers/UserFieldsMocker';

export function mockUserMongoPersistence(): WithMongoId<IUserModel> {
  return {
    _id: Mocker.mockMongoId(),
    firstName: UserFieldsMocker.mockName(),
    lastName: UserFieldsMocker.mockName(),
    email: UserFieldsMocker.mockEmail(),
    cpf: UserFieldsMocker.mockCpf(),
    password: UserFieldsMocker.mockPassword(),
    role: Mocker.mockEnum(UserRole),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
