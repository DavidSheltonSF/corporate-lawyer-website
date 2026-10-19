import {
  CreateResponse,
  DeleteByIdResponse,
  FindAllResponse,
  FindByEmailResponse,
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
  findByEmail: (httpRequest: HttpRequest) => Promise<FindByEmailResponse>;
  updateById: (httpRequest: HttpRequest) => Promise<UpdateByIdResponse>;
  deleteById: (httpRequest: HttpRequest) => Promise<DeleteByIdResponse>;
}
