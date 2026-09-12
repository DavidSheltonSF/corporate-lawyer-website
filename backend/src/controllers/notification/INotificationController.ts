import { FindByIdResponse } from './responses.js';
import { HttpRequest } from '../types/HttpRequest.js';

export interface INotificationsController {
  findById: (httpRequest: HttpRequest) => Promise<FindByIdResponse>;
  findMy: (httpRequest: HttpRequest) => Promise<FindByIdResponse>;
  markAsRead: (HttpRequest: HttpRequest) => Promise<FindByIdResponse>;
}
