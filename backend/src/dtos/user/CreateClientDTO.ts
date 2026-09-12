import { UserDTO } from './UserDTO.js';

export type CreateClientDTO = Omit<UserDTO, 'password' | 'role'>;
