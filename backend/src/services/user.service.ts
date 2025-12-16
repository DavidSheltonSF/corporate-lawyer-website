import { UserModel } from '../models/user.model';
import { User } from '../types/User';
import { UserResponse } from '../types/UserResponse';

export class UserService {
  async create(data: User): Promise<UserResponse> {
    try {
      const createdUser = await UserModel.create(data);

      return {
        id: createdUser._id.toString(),
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        cpf: createdUser.cpf,
        email: createdUser.email,
        role: createdUser.role,
        createdAt: createdUser.createdAt,
        updatedAt: createdUser.updatedAt,
      };
    } catch (error: any) {
      if (error.code === 11000) {
        throw Error('User already exists');
      }

      throw error;
    }
  }

  async findAll(): Promise<UserResponse[]> {
    const users = await UserModel.find({});

    return users.map((user) => {
      return {
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        cpf: user.cpf,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    });
  }

  async findById(id: string): Promise<UserResponse> {
    const foundUser = await UserModel.findById(id, { password: 0 }).lean();

    if (!foundUser) {
      throw Error('User not found');
    }

    return {
      id: foundUser._id.toString(),
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      cpf: foundUser.cpf,
      email: foundUser.email,
      role: foundUser.role,
      createdAt: foundUser.createdAt,
      updatedAt: foundUser.updatedAt,
    };
  }

  async findByEmail(email: string): Promise<UserResponse> {
    const foundUser = await UserModel.findOne({ email }, { password: 0 }).lean();

    if (!foundUser) {
      throw Error('User not found');
    }

    return {
      id: foundUser._id.toString(),
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      cpf: foundUser.cpf,
      email: foundUser.email,
      role: foundUser.role,
      createdAt: foundUser.createdAt,
      updatedAt: foundUser.updatedAt,
    };
  }
}
