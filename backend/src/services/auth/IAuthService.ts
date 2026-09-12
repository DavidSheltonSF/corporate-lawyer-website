import { AuthTokenResponse } from './AuthTokenResponse.js';

export interface IAuthService {
  authenticate(email: string, password: string): Promise<AuthTokenResponse>;
}
