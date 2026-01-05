import { CreateUserDTO } from '../dtos/user/CreateUserDTO';
import { UserResponseDTO } from '../dtos/user/UserResponseDTO';
import { WithId } from '../types/WithId';

export interface IUserService {
  create(data: CreateUserDTO): Promise<WithId<UserResponseDTO>>;
  findAll(): Promise<WithId<UserResponseDTO>[]>;
  findById(id: string): Promise<WithId<UserResponseDTO>>;
  findByEmail(email: string): Promise<WithId<UserResponseDTO>>;
}
