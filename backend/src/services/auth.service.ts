import { UnauthorizedError } from '../errors/UnauthorizedError';
import { UserModel } from '../models/user.model';
import { UserResponse } from '../types/UserResponse';
import bcrypt from 'bcrypt';

export class AuthService {
  async authenticate(
    email: string,
    password: string
  ): Promise<{ user: UserResponse; token: string }> {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedError('Invalid email');
    }

    const passwordIsValid = bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      throw new UnauthorizedError('Invalid password');
    }

    const fakeToken = email + '-token';
    return {
      user: {
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        cpf: user.cpf,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      token: fakeToken,
    };
  }
}
