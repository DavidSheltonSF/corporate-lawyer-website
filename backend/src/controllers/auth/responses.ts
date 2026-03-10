import { UserResponseDTO } from '../../dtos/user/UserResponseDTO';
import { AuthTokenResponse } from '../../services/auth/AuthTokenResponse';
import { WithId } from '../../types/WithId';
import { HttpResponse } from '../types/HttpResponse';

export type GetMeResponse = HttpResponse<WithId<UserResponseDTO> | null>;
export type AuthResponse = HttpResponse<AuthTokenResponse | null>;
