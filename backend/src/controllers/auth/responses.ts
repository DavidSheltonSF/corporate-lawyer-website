import { UserResponseDTO } from '../../dtos/user/UserResponseDTO.js';
import { AuthTokenResponse } from '../../services/auth/AuthTokenResponse.js';
import { WithId } from '../../types/WithId.js';
import { HttpResponse } from '../types/HttpResponse.js';

export type GetMeResponse = HttpResponse<WithId<UserResponseDTO> | null>;
export type AuthResponse = HttpResponse<AuthTokenResponse | null>;
