import { User } from './User';

export type SafeUser = Omit<User, 'password'>;
