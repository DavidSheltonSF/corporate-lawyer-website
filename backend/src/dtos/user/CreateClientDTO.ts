import { UserDTO } from './UserDTO';

export type CreateClientDTO = Omit<UserDTO, 'password' | 'role'>;
