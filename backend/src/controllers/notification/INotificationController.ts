import { FindByIdResponse } from './responses';
import { HttpRequest } from '../types/HttpRequest';

export interface INotificationsController {
  findById: (httpRequest: HttpRequest) => Promise<FindByIdResponse>;
  findUserById: (httpRequest: HttpRequest) => Promise<FindByIdResponse>;
}
