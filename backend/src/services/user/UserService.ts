import { CreateClientDTO } from '../../dtos/user/CreateClientDTO.js';
import { CreateClientResponseDTO } from '../../dtos/user/CreateClientResponseDTO.js';
import { UpdateUserDTO } from '../../dtos/user/UpdateUserDTO.js';
import { UserResponseDTO } from '../../dtos/user/UserResponseDTO.js';
import { DuplicatedEmailError } from '../../errors/domain/DuplicatedEmailError.js';
import { ValidationError } from '../../errors/presentation/ValidationError.js';
import { CaseRepository } from '../../repositories/CaseRepository.js';
import { UserRepository } from '../../repositories/UserRepository.js';
import { Page } from '../../types/Page.js';
import { UserQuery } from '../../types/UserQuery.js';
import { UserRole } from '../../types/UserRole.js';
import { WithId } from '../../types/WithId.js';
import { generateTemporaryPassword } from '../helpers/generateTemporaryPassword.js';
import { validateEmail } from '../validators/users/validateEmail.js';
import { validateUserPartial } from '../validators/users/validateUserPartial.js';
import { IUserService } from './IUserService.js';

export class UserService implements IUserService {
  constructor(
    private userRepository: UserRepository,
    private caseRepository: CaseRepository
  ) {}
  async createClient(data: CreateClientDTO): Promise<WithId<CreateClientResponseDTO>> {
    const { firstName, lastName, email, phone, cpf } = data;

    validateUserPartial(data);

    const userExists = await this.userRepository.existsByEmail(data.email);

    if (userExists) {
      throw new DuplicatedEmailError(email);
    }

    const tempPassword = generateTemporaryPassword(8);

    const user = await this.userRepository.create({
      firstName,
      lastName,
      email,
      phone,
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

    const users = page.items;

    const mappedUsers = users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    return { items: mappedUsers, meta: page.meta };
  }

  async findById(id: string): Promise<WithId<UserResponseDTO> | null> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      return null;
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findByEmail(email: string): Promise<WithId<UserResponseDTO> | null> {
    if (!validateEmail(email)) {
      throw new ValidationError('Invalid user data', {
        email: `Email '${email}' is invalid. Expected format: example@email.com`,
      });
    }
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return null;
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async updateById(
    id: string,
    data: Partial<UpdateUserDTO>
  ): Promise<WithId<UserResponseDTO> | null> {
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
