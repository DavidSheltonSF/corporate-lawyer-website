import { UserResponseDTO } from '../../dtos/user/UserResponseDTO';
import { WithId } from '../../types/WithId';
import { HttpResponse } from '../types/HttpResponse';

export type FindAllResponse = HttpResponse<WithId<UserResponseDTO>[]>;
export type FindByIdResponse = HttpResponse<WithId<UserResponseDTO> | null>;
export type CreateResponse = HttpResponse<WithId<UserResponseDTO> | null>;
