import { UserRepository } from '../repositories/UserRepository';
import { WithId } from '../types/WithId';
import { UserModel } from '../models/UserModel';
import { CreateUserDTO } from '../dtos/user/CreateUserDTO';
import { User } from '../entities/User';

export class MongodbUserRepository implements UserRepository {
  async findAll(): Promise<WithId<User>[]> {
    const users = await UserModel.find({}).lean();
    return users.map((user) => {
      return {
        id: user._id.toString(),
        ...user,
      };
    });
  }

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

  async create(data: CreateUserDTO): Promise<WithId<User>> {
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

  async exists(id: string): Promise<boolean> {
    const result = await UserModel.findById(id);
    return result != undefined;
  }
}
