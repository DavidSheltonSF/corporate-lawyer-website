import { UserResponseDTO } from '../../dtos/user/UserResponseDTO.js';
import { Page } from '../../types/Page.js';
import { WithId } from '../../types/WithId.js';
import { HttpResponse } from '../types/HttpResponse.js';

export type CreateResponse = HttpResponse<WithId<UserResponseDTO> | null>;
export type FindAllResponse = HttpResponse<WithId<UserResponseDTO>[]>;
export type FindClientsResponse = HttpResponse<Page<WithId<UserResponseDTO>> | null>;
export type FindByIdResponse = HttpResponse<WithId<UserResponseDTO> | null>;
export type UpdateByIdResponse = HttpResponse<WithId<UserResponseDTO> | null>;
export type DeleteByIdResponse = HttpResponse<WithId<UserResponseDTO> | null>;
