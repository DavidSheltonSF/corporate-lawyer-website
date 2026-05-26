import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../../repositories/UserRepository';
import dotenv from 'dotenv';
import { AuthTokenResponse } from './AuthTokenResponse';

dotenv.config();

export class AuthService {
  constructor(private userRepository: UserRepository) {}
  async authenticate(email: string, password: string): Promise<AuthTokenResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return { invalidFields: { email: 'Invalid email', password: null }, token: null };
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (passwordIsValid !== true) {
       return { invalidFields: { email: null, password: 'Invalid password' }, token: null };
    }

    const API_SECRET = process.env.API_SECRET;

    if (API_SECRET === undefined) {
      throw Error('API secret not found');
    }

    const token = jwt.sign({ sub: user.id, email }, API_SECRET, { expiresIn: '1h' });

    return {
      token,
    };
  }
}
