import { CreateResponse, FindAllResponse, FindByIdResponse } from './responses';
import { HttpRequest } from '../types/HttpRequest';

export interface IUserController {
  create: (httpRequest: HttpRequest) => Promise<CreateResponse>;
  findAll: (httpRequest: HttpRequest) => Promise<FindAllResponse>;
  findById: (httpRequest: HttpRequest) => Promise<FindByIdResponse>;
}
