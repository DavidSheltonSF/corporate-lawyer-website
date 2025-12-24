import { UnauthorizedError } from '../errors/UnauthorizedError';
import { UserModel } from '../models/user.model';
import { UserResponse } from '../types/UserResponse';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

    const token = jwt.sign({ sub: user._id.toString(), email }, 'secret', { expiresIn: 60 });

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
      token,
    };
  }
}