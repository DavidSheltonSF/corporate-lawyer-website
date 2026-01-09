import { User } from '../entities/User';
import { UserDocument } from '../models/UserModel';
import { WithId } from '../types/WithId';

export function userDocumentToDomain(user: UserDocument): WithId<User> {
  return {
    id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.firstName,
    email: user.email,
    cpf: user.cpf,
    password: user.password,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
