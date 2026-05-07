import { FindByIdResponse } from './responses';
import { HttpRequest } from '../types/HttpRequest';

export interface INotificationsController {
  findById: (httpRequest: HttpRequest) => Promise<FindByIdResponse>;
  findMy: (httpRequest: HttpRequest) => Promise<FindByIdResponse>;
  markAsRead: (HttpRequest: HttpRequest) => Promise<FindByIdResponse>;
}
