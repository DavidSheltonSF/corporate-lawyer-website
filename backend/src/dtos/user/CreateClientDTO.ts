import { CreateUserDTO } from './CreateUserDTO';

export type CreateClientDTO = Omit<CreateUserDTO, 'password' | 'role'>;
