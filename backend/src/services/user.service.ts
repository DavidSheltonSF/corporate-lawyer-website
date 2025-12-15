import { UserModel } from '../models/user.model';
import { User } from '../types/User';

export class UserService {
  async create(data: User): Promise<Omit<User, 'password'>> {
    const { email } = data;

    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      throw Error('User already exists');
    }

    const createdUser = await UserModel.create(data);

    return {
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      cpf: createdUser.cpf,
      email: createdUser.email,
      role: createdUser.role,
    };
  }

  async findAll(): Promise<Omit<User, 'password'>[]> {
    return await UserModel.find({}, {
      password: 0
    }).lean()
  }
}
