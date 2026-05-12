import { UserDTO } from './UserDTO';

export type UserResponseDTO = Omit<UserDTO, 'password'>;
