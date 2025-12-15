import { UserModel } from '../models/user.model';
import { User } from '../types/User';

export class UserService {
  async create(data: User): Promise<Omit<User, 'password'>> {
    try {
      const createdUser = await UserModel.create(data);

      return {
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        cpf: createdUser.cpf,
        email: createdUser.email,
        role: createdUser.role,
      };
    } catch (error: any) {
      if (error.code === 11000) {
        throw Error('User already exists');
      }

      throw error;
    }
  }

  async findAll(): Promise<Omit<User, 'password'>[]> {
    return await UserModel.find(
      {},
      {
        password: 0,
      }
    ).lean();
  }
}
