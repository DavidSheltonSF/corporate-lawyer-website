import { CreateUserDTO } from '../../dtos/user/CreateUserDTO';
import { UserResponseDTO } from '../../dtos/user/UserResponseDTO';
import { InvalidRoleError } from '../../errors/domain/InvalidRoleError';
import { UserRepository } from '../../repositories/UserRepository';
import { UserRole } from '../../types/UserRole';
import { WithId } from '../../types/WithId';

export class UserService {
  constructor(private userRepository: UserRepository) {}
  async create(data: CreateUserDTO): Promise<WithId<UserResponseDTO>> {
    const { role } = data;

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
        throw new InvalidRoleError(role);
    }

    const user = await this.userRepository.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      cpf: data.cpf,
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

  async findById(id: string): Promise<WithId<UserResponseDTO>> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw Error('User not found');
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findByEmail(email: string): Promise<WithId<UserResponseDTO>> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw Error('User not found');
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
