import { UpdateUserDTO } from '../dtos/user/UpdateUserDTO';
import { UserDTO } from '../dtos/user/UserDTO';
import { Page } from '../types/Page';
import { UserQuery } from '../types/UserQuery';
import { WithId } from '../types/WithId';

export interface UserRepository {
  create(user: UserDTO): Promise<WithId<UserDTO>>;
  findAll(): Promise<WithId<UserDTO>[]>;
  findClients(userQuery: UserQuery): Promise<Page<WithId<UserDTO>>>;
  findById(id: string): Promise<WithId<UserDTO> | null>;
  findByEmail(email: string): Promise<WithId<UserDTO> | null>;
  deleteById(id: string): Promise<WithId<UserDTO> | null>;
  updateById(id: string, data: Partial<UpdateUserDTO>): Promise<WithId<UserDTO> | null>;
  existsById(id: string): Promise<boolean>;
  existsByEmail(email: string): Promise<boolean>;
}
