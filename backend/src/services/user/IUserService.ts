import { CreateClientDTO } from '../../dtos/user/CreateClientDTO';
import { UpdateUserDTO } from '../../dtos/user/UpdateUserDTO';
import { UserResponseDTO } from '../../dtos/user/UserResponseDTO';
import { Page } from '../../types/Page';
import { UserIncludeOptions } from '../../types/UserincludeOptions';
import { UserQuery } from '../../types/UserQuery';
import { WithId } from '../../types/WithId';

export interface IUserService {
  createClient(data: CreateClientDTO): Promise<WithId<UserResponseDTO>>;
  findAll(): Promise<WithId<UserResponseDTO>[]>;
  findClients(userQuery: UserQuery): Promise<Page<WithId<UserResponseDTO>>>;
  findById(id: string, include?: UserIncludeOptions): Promise<WithId<UserResponseDTO> | null>;
  findByEmail(email: string): Promise<WithId<UserResponseDTO> | null>;
  updateById(id: string, data: Partial<UpdateUserDTO>): Promise<WithId<UserResponseDTO> | null>;
  deleteById(id: string): Promise<WithId<UserResponseDTO> | null>;
}
