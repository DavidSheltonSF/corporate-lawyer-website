import { UserRepository } from '../../../domain/repositories/UserRepository';
import { User } from '../../../types/User';
import { UserModel } from '../models/user.model';

export class MongodbUserRepository {
  async findById(id: string): Promise<User | null> {
    return await UserModel.findById(id).lean();
  }

  async findByEmail(email: string): Promise<User | null> {
    return await UserModel.findOne({ email }).lean();
  }

  async create(user: User): Promise<User> {
    const createdUser = await UserModel.create(user);
    return createdUser.toObject();
  }
}
