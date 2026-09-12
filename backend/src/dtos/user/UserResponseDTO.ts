import { UserDTO } from './UserDTO.js';

export type UserResponseDTO = Omit<UserDTO, 'password'>;
