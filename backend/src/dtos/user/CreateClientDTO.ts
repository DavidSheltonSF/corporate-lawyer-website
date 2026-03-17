import { CreateUserDTO } from './UserDTO';

export type CreateClientDTO = Omit<CreateUserDTO, 'password' | 'role'>;
