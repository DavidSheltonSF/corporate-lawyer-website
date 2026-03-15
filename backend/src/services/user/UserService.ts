import { CreateClientDTO } from '../../dtos/user/CreateClientDTO';
import { CreateClientResponseDTO } from '../../dtos/user/CreateClientResponseDTO';
import { UserResponseDTO } from '../../dtos/user/UserResponseDTO';
import { UserNotFoundError } from '../../errors/application/UserNotFoundError';
import { EntityAlreadyExistsError } from '../../errors/domain/EntityAlreadyExistsError';
import { UserRepository } from '../../repositories/UserRepository';
import { Page } from '../../types/Page';
import { UserQuery } from '../../types/UserQuery';
import { UserRole } from '../../types/UserRole';
import { WithId } from '../../types/WithId';
import { generateTemporaryPassword } from '../helpers/generateTemporaryPassword';
import { validateEmail } from '../validators/validateEmail';
import { validateNewClient } from '../validators/validateNewClient';
import { IUserService } from './IUserService';

export class UserService implements IUserService {
  constructor(private userRepository: UserRepository) {}
  async createClient(data: CreateClientDTO): Promise<WithId<CreateClientResponseDTO>> {
    const { firstName, lastName, email, cpf } = data;

    validateNewClient(data);

    const userExists = await this.userRepository.existsByEmail(data.email);

    if (userExists) {
      throw new EntityAlreadyExistsError(`User with email '${data.email}' already exists`);
    }

    const tempPassword = generateTemporaryPassword(8);

    const user = await this.userRepository.create({
      firstName,
      lastName,
      email,
      cpf,
      password: tempPassword,
      role: UserRole.client,
    });

    return { ...user, password: tempPassword };
  }

  async findAll(): Promise<WithId<UserResponseDTO>[]> {
    const users = await this.userRepository.findAll();

    return users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  async findClients(userQuery: UserQuery): Promise<Page<WithId<UserResponseDTO>>> {
    let page = await this.userRepository.findClients(userQuery);

    const users = page.data;

    const mappedUsers = users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    return { data: mappedUsers, meta: page.meta };
  }

  async findById(id: string): Promise<WithId<UserResponseDTO>> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UserNotFoundError(`User with id '${id}' was not found`);
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findByEmail(email: string): Promise<WithId<UserResponseDTO>> {
    validateEmail(email);
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UserNotFoundError(`User with email '${email}' was not found`);
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async deleteById(id: string): Promise<WithId<UserResponseDTO>> {
    const result = await this.userRepository.deleteById(id);
    if (!result) {
      throw new UserNotFoundError(`User with id '${id}' was not found`);
    }
    return result;
  }
}
