import { UserResponseDTO } from '../../dtos/user/UserResponseDTO';
import { WithId } from '../../types/WithId';

export interface IAuthService {
  authenticate(
    email: string,
    password: string
  ): Promise<{ user: WithId<UserResponseDTO>; token: string }>;
}
