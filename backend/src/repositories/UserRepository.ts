import { CreateUserDTO } from '../dtos/user/CreateUserDTO';
import { User } from '../entities/User';
import { Page } from '../types/Page';
import { UserQuery } from '../types/UserQuery';
import { WithId } from '../types/WithId';

export interface UserRepository {
  findAll(): Promise<WithId<User>[]>;
  findClients(userQuery: UserQuery): Promise<Page<WithId<User>>>;
  findById(id: string): Promise<WithId<User> | null>;
  findByEmail(email: string): Promise<WithId<User> | null>;
  create(user: CreateUserDTO): Promise<WithId<User>>;
  existsById(id: string): Promise<boolean>;
  existsByEmail(email: string): Promise<boolean>;
}
