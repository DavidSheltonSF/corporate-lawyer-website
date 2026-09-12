import { UserDTO } from './UserDTO.js';

export type UpdateUserDTO = Omit<UserDTO, 'password' | 'role'>;
