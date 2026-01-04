import { UserRepository } from '../../../repositories/UserRepository';
import { User } from '../../../types/User';
import { WithId } from '../../../types/WithId';
import { UserModel } from '../models/user.model';

export class MongodbUserRepository implements UserRepository {
  async findById(id: string): Promise<WithId<User> | null> {
    const user = await UserModel.findById(id).lean();

    if (!user) {
      return null;
    }
    return {
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      cpf: user.cpf,
      password: user.password,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async findByEmail(email: string): Promise<WithId<User> | null> {
    const user = await UserModel.findOne({ email }).lean();

    if (!user) {
      return null;
    }

    return {
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      cpf: user.cpf,
      password: user.password,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async create(data: User): Promise<WithId<User>> {
    const user = await UserModel.create(data);

    return {
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      cpf: user.cpf,
      password: user.password,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
