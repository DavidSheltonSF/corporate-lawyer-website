import { HttpRequest } from '../types/HttpRequest.js';
import { AuthResponse, GetMeResponse } from './responses.js';

export interface IAuthController {
  getMe: (httpRequest: HttpRequest) => Promise<GetMeResponse>;
  authenticate: (httpRequest: HttpRequest) => Promise<AuthResponse>;
}
