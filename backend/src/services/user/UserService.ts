import { CreateClientDTO } from '../../dtos/user/CreateClientDTO';
import { CreateClientResponseDTO } from '../../dtos/user/CreateClientResponseDTO';
import { UpdateUserDTO } from '../../dtos/user/UpdateUserDTO';
import { UserResponseDTO } from '../../dtos/user/UserResponseDTO';
import { EntityAlreadyExistsError } from '../../errors/domain/EntityAlreadyExistsError';
import { CaseRepository } from '../../repositories/CaseRepository';
import { UserRepository } from '../../repositories/UserRepository';
import { Page } from '../../types/Page';
import { UserQuery } from '../../types/UserQuery';
import { UserRole } from '../../types/UserRole';
import { WithId } from '../../types/WithId';
import { generateTemporaryPassword } from '../helpers/generateTemporaryPassword';
import { validateEmail } from '../validators/validateEmail';
import { validateUserPartial } from '../validators/validateUserPartial';
import { IUserService } from './IUserService';
import { UserIncludeOptions } from '../../types/UserincludeOptions';

export class UserService implements IUserService {
  constructor(private userRepository: UserRepository, private caseRepository: CaseRepository) {}
  async createClient(data: CreateClientDTO): Promise<WithId<CreateClientResponseDTO>> {
    const { firstName, lastName, email, cpf } = data;

    validateUserPartial(data);

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

  async findById(
    id: string,
    include?: UserIncludeOptions
  ): Promise<WithId<UserResponseDTO> | null> {
    let user = null;

    if (include?.cases) {
      user = await this.userRepository.findByIdWithCases(id);
    } else {
      user = await this.userRepository.findById(id);
    }

    if (!user) {
      return null;
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findByEmail(email: string): Promise<WithId<UserResponseDTO> | null> {
    validateEmail(email);
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return null;
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async updateById(id: string, data: UpdateUserDTO): Promise<WithId<UserResponseDTO> | null> {
    validateUserPartial(data);
    const result = await this.userRepository.updateById(id, data);
    if (!result) {
      return null;
    }
    const { password, ...userWithoutPassword } = result;
    return userWithoutPassword;
  }

  async deleteById(id: string): Promise<WithId<UserResponseDTO> | null> {
    await this.caseRepository.deleteByUserId(id);
    const result = await this.userRepository.deleteById(id);
    if (!result) {
      return null;
    }
    const { password, ...userWithoutPassword } = result;
    return userWithoutPassword;
  }
}
