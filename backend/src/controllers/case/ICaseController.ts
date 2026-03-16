import {
  AddFileResponse,
  FindByClientResponse,
  FindByIdResponse,
  FindFilesByCaseId,
  GetMyStatsResponse,
} from './responses';
import { HttpRequest } from '../types/HttpRequest';

export interface ICaseController {
  findById: (httpRequest: HttpRequest) => Promise<FindByIdResponse>;
  findMyCases: (httpRequest: HttpRequest) => Promise<FindByClientResponse>;
  getMyStats: (httpRequest: HttpRequest) => Promise<GetMyStatsResponse>;
  getStats: (httpRequest: HttpRequest) => Promise<GetMyStatsResponse>;
  uploadMyFile: (httpRequest: HttpRequest) => Promise<AddFileResponse>;
  findFilesByCaseId: (httpRequest: HttpRequest) => Promise<FindFilesByCaseId>;
}
