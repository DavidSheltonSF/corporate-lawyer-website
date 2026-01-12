import { UnauthorizedError } from '../../errors/UnauthorizedError';
import { UserResponseDTO } from '../../dtos/user/UserResponseDTO';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { WithId } from '../../types/WithId';
import { UserRepository } from '../../repositories/UserRepository';

export class AuthService {
  constructor(private userRepository: UserRepository) {}
  async authenticate(
    email: string,
    password: string
  ): Promise<{ user: WithId<UserResponseDTO>; token: string }> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedError('Invalid email');
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (passwordIsValid !== true) {
      throw new UnauthorizedError('Invalid password');
    }

    const token = jwt.sign({ sub: user.id, email }, 'secret', { expiresIn: 60 });

    return {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        cpf: user.cpf,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }
}
