import { UserDTO } from './UserDTO.js';

export type CreateClientResponseDTO = UserDTO & { password: string };
