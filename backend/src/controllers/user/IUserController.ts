import {
  CreateResponse,
  DeleteByIdResponse,
  FindAllResponse,
  FindByIdResponse,
  FindClientsResponse,
  UpdateByIdResponse,
} from './responses.js';
import { HttpRequest } from '../types/HttpRequest.js';

export interface IUserController {
  createClient: (httpRequest: HttpRequest) => Promise<CreateResponse>;
  findAll: (httpRequest: HttpRequest) => Promise<FindAllResponse>;
  findClients: (httpRequest: HttpRequest) => Promise<FindClientsResponse>;
  findById: (httpRequest: HttpRequest) => Promise<FindByIdResponse>;
  updateById: (httpRequest: HttpRequest) => Promise<UpdateByIdResponse>;
  deleteById: (httpRequest: HttpRequest) => Promise<DeleteByIdResponse>;
}
