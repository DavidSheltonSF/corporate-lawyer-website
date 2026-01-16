import { AuthenticationResponse } from './AuthenticationResponse';

export interface IAuthService {
  authenticate(email: string, password: string): Promise<AuthenticationResponse>;
}
