import {
  AddFileResponse,
  CreateResponse,
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
  findMyCases: (httpRequest: HttpRequest) => Promise<FindByClientResponse>;
  getMyStats: (httpRequest: HttpRequest) => Promise<GetMyStatsResponse>;
  getStats: (httpRequest: HttpRequest) => Promise<GetMyStatsResponse>;
  uploadMyFile: (httpRequest: HttpRequest) => Promise<AddFileResponse>;
  findFilesByCaseId: (httpRequest: HttpRequest) => Promise<FindFilesByCaseId>;
}
