import { UserResponseDTO } from '../../dtos/user/UserResponseDTO';
import { Page } from '../../types/Page';
import { WithId } from '../../types/WithId';
import { HttpResponse } from '../types/HttpResponse';

export type CreateResponse = HttpResponse<WithId<UserResponseDTO> | null>;
export type FindAllResponse = HttpResponse<WithId<UserResponseDTO>[]>;
export type FindClientsResponse = HttpResponse<Page<WithId<UserResponseDTO>>>;
export type FindByIdResponse = HttpResponse<WithId<UserResponseDTO> | null>;
export type UpdateByIdResponse = HttpResponse<WithId<UserResponseDTO> | null>;
export type DeleteByIdResponse = HttpResponse<WithId<UserResponseDTO> | null>;
