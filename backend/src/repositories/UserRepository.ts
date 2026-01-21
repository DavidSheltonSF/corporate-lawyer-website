import { CreateUserDTO } from '../dtos/user/CreateUserDTO';
import { User } from '../entities/User';
import { WithId } from '../types/WithId';

export interface UserRepository {
  findAll(): Promise<WithId<User>[]>;
  findById(id: string): Promise<WithId<User> | null>;
  findByEmail(email: string): Promise<WithId<User> | null>;
  create(user: CreateUserDTO): Promise<WithId<User>>;
  exists(id: string): Promise<boolean>;
}
