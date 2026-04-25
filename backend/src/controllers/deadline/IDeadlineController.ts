import {
  CreateResponse,
  DeleteByIdResponse,
  FindAllResponse,
  FindByIdResponse,
  UpdateByIdResponse,
} from './responses';
import { HttpRequest } from '../types/HttpRequest';

export interface IDeadlineController {
  create: (httpRequest: HttpRequest) => Promise<CreateResponse>;
  findAll: (httpRequest: HttpRequest) => Promise<FindAllResponse>;
  findById: (httpRequest: HttpRequest) => Promise<FindByIdResponse>;
  findByCaseId: (httpRequest: HttpRequest) => Promise<FindByIdResponse>;
  updateById: (httpRequest: HttpRequest) => Promise<UpdateByIdResponse>;
  deleteById: (httpRequest: HttpRequest) => Promise<DeleteByIdResponse>;
}
