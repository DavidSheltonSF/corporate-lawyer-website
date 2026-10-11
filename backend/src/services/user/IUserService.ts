import { CreateClientDTO } from '../../dtos/user/CreateClientDTO.js';
import { UpdateUserDTO } from '../../dtos/user/UpdateUserDTO.js';
import { UserDTO } from '../../dtos/user/UserDTO.js';
import { UserResponseDTO } from '../../dtos/user/UserResponseDTO.js';
import { Page } from '../../types/Page.js';
import { UserQueryParams } from '../../types/UserQueryParams.js';
import { WithId } from '../../types/WithId.js';

export interface IUserService {
  createClient(data: CreateClientDTO): Promise<WithId<UserDTO>>;
  findAll(): Promise<WithId<UserResponseDTO>[]>;
  findClients(userQuery: UserQueryParams): Promise<Page<WithId<UserResponseDTO>>>;
  findById(id: string): Promise<WithId<UserResponseDTO> | null>;
  findByEmail(email: string): Promise<WithId<UserResponseDTO> | null>;
  updateById(id: string, data: Partial<UpdateUserDTO>): Promise<WithId<UserResponseDTO> | null>;
  deleteById(id: string): Promise<WithId<UserResponseDTO> | null>;
}
