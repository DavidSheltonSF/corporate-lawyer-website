import { UpdateUserDTO } from '../dtos/user/UpdateUserDTO';
import { UserDTO } from '../dtos/user/UserDTO';
import { User } from '../entities/User';
import { UserWithCases } from '../types/UserWithCases';
import { Page } from '../types/Page';
import { UserQuery } from '../types/UserQuery';
import { WithId } from '../types/WithId';

export interface UserRepository {
  create(user: UserDTO): Promise<WithId<User>>;
  findAll(): Promise<WithId<User>[]>;
  findClients(userQuery: UserQuery): Promise<Page<WithId<User>>>;
  findById(id: string): Promise<WithId<User> | null>;
  findByIdWithCases(id: string): Promise<WithId<UserWithCases> | null>;
  findByEmail(email: string): Promise<WithId<User> | null>;
  deleteById(id: string): Promise<WithId<User> | null>;
  updateById(id: string, data: UpdateUserDTO): Promise<WithId<User> | null>;
  existsById(id: string): Promise<boolean>;
  existsByEmail(email: string): Promise<boolean>;
}
