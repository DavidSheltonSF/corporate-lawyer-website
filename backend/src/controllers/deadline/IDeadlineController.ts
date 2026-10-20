import {
  CreateResponse,
  DeleteByIdResponse,
  FindByIdResponse,
  UpdateByIdResponse,
} from './responses.js';
import { HttpRequest } from '../types/HttpRequest.js';

export interface IDeadlineController {
  create: (httpRequest: HttpRequest) => Promise<CreateResponse>;
  findById: (httpRequest: HttpRequest) => Promise<FindByIdResponse>;
  findByCaseId: (httpRequest: HttpRequest) => Promise<FindByIdResponse>;
  updateById: (httpRequest: HttpRequest) => Promise<UpdateByIdResponse>;
  deleteById: (httpRequest: HttpRequest) => Promise<DeleteByIdResponse>;
}
