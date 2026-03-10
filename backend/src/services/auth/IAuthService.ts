import { AuthTokenResponse } from './AuthTokenResponse';

export interface IAuthService {
  authenticate(email: string, password: string): Promise<AuthTokenResponse>;
}
