import {
  CreateResponse,
  FindAllResponse,
  FindByIdResponse,
  FindClientsResponse,
} from './responses';
import { HttpRequest } from '../types/HttpRequest';

export interface IUserController {
  createClient: (httpRequest: HttpRequest) => Promise<CreateResponse>;
  findAll: (httpRequest: HttpRequest) => Promise<FindAllResponse>;
  findClients: (httpRequest: HttpRequest) => Promise<FindClientsResponse>;
  findById: (httpRequest: HttpRequest) => Promise<FindByIdResponse>;
}
