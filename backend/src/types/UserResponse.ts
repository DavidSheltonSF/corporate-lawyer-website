import { Timestamps } from './Timestamps';
import { User } from './User';
import { WithId } from './WithId';

export type UserResponse = WithId<Omit<User, 'password'>>;
