import { User } from '../types/User';
import { WithId } from '../types/WithId';

export interface UserRepository {
  findById(id: string): Promise<WithId<User> | null>;
  findByEmail(email: string): Promise<WithId<User> | null>;
  create(user: User): Promise<WithId<User>>;
}
