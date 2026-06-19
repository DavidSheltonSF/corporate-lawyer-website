import {
  AddFileResponse,
  CreateResponse,
  DeleteByIdResponse,
  DeleteFileResponse,
  FindByClientResponse,
  FindByIdResponse,
  FindFilesByCaseId,
  GetMyStatsResponse,
} from './responses';
import { HttpRequest } from '../types/HttpRequest';

export interface ICaseController {
  create: (httpRequest: HttpRequest) => Promise<CreateResponse>;
  updateById: (httpRequest: HttpRequest) => Promise<CreateResponse>;
  findById: (httpRequest: HttpRequest) => Promise<FindByIdResponse>;
  findAll: (httpRequest: HttpRequest) => Promise<FindByClientResponse>;
  findMyCases: (httpRequest: HttpRequest) => Promise<FindByClientResponse>;
  getMyStats: (httpRequest: HttpRequest) => Promise<GetMyStatsResponse>;
  getStats: (httpRequest: HttpRequest) => Promise<GetMyStatsResponse>;
  uploadMyFile: (httpRequest: HttpRequest) => Promise<AddFileResponse>;
  deleteFile: (httpRequest: HttpRequest) => Promise<DeleteFileResponse>;
  findFilesByCaseId: (httpRequest: HttpRequest) => Promise<FindFilesByCaseId>;
  deleteById: (httpRequest: HttpRequest) => Promise<DeleteByIdResponse>;
}
