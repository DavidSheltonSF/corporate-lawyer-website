import { CreateUserDTO } from '../../dtos/user/CreateUserDTO';
import { UserResponseDTO } from '../../dtos/user/UserResponseDTO';
import { Page } from '../../types/Page';
import { UserQuery } from '../../types/UserQuery';
import { WithId } from '../../types/WithId';

export interface IUserService {
  create(data: CreateUserDTO): Promise<WithId<UserResponseDTO>>;
  findAll(): Promise<WithId<UserResponseDTO>[]>;
  findClients(userQuery: UserQuery): Promise<Page<WithId<UserResponseDTO>>>;
  findById(id: string): Promise<WithId<UserResponseDTO>>;
  findByEmail(email: string): Promise<WithId<UserResponseDTO>>;
}
