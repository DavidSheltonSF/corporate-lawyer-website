import { UserDTO } from './UserDTO';

export type UpdateUserDTO = Omit<UserDTO, 'password' | 'role'>;
