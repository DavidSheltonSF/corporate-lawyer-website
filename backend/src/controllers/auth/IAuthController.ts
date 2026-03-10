import { HttpRequest } from '../types/HttpRequest';
import { AuthResponse, GetMeResponse } from './responses';

export interface IAuthController {
  getMe: (httpRequest: HttpRequest) => Promise<GetMeResponse>;
  auth: (httpRequest: HttpRequest) => Promise<AuthResponse>;
}
