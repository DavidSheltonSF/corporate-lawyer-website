import { CreateUserDTO } from '../../dtos/user/CreateUserDTO';
import { UserResponseDTO } from '../../dtos/user/UserResponseDTO';
import { UserNotFoundError } from '../../errors/application/UserNotFoundError';
import { EntityAlreadyExistsError } from '../../errors/domain/EntityAlreadyExistsError';
import { InvalidUserRoleError } from '../../errors/domain/InvalidUserRoleError';
import { UserRepository } from '../../repositories/UserRepository';
import { Page } from '../../types/Page';
import { UserQuery } from '../../types/UserQuery';
import { UserRole } from '../../types/UserRole';
import { WithId } from '../../types/WithId';
import { validateEmail } from '../validators/validateEmail';
import { validateUser } from '../validators/validateUser';
import { IUserService } from './IUserService';

export class UserService implements IUserService {
  constructor(private userRepository: UserRepository) {}
  async create(data: CreateUserDTO): Promise<WithId<UserResponseDTO>> {
    const { firstName, lastName, email, cpf, role } = data;

    validateUser(data);

    let userRole: UserRole;
    switch (role) {
      case UserRole.admin:
        userRole = UserRole.admin;
        break;

      case UserRole.client:
        userRole = UserRole.client;
        break;

      case UserRole.lawyer:
        userRole = UserRole.lawyer;
        break;

      default:
        throw new InvalidUserRoleError(role);
    }

    const userExists = await this.userRepository.existsByEmail(data.email);

    if (userExists) {
      throw new EntityAlreadyExistsError(`User with email '${data.email}' already exists`);
    }

    const user = await this.userRepository.create({
      firstName,
      lastName,
      email,
      cpf,
      password: data.password,
      role: userRole,
    });

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
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

  async existsById(id: string): Promise<boolean> {
    const userExists = await this.userRepository.existsById(id);
    if (userExists) {
      return true;
    }
    return false;
  }
}
