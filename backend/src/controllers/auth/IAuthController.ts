import { AuthenticatedUser } from '../../types/AuthenticatedUser';
import { HttpRequest } from '../types/HttpRequest';
import { AuthResponse, GetMeResponse } from './responses';

export interface IAuthController {
  getMe: (httpRequest: HttpRequest & AuthenticatedUser) => Promise<GetMeResponse>;
  auth: (httpRequest: HttpRequest) => Promise<AuthResponse>;
}
