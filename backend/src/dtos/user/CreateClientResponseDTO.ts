import { UserDTO } from './UserDTO';

export type CreateClientResponseDTO = UserDTO & { password: string };
