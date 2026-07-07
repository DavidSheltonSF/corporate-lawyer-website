import { HttpRequest } from '../types/HttpRequest';
import { DeleteByIdResponse, FindByIdResponse, RenameResponse } from './responses';

export interface IFileController {
  findById: (httpRequest: HttpRequest) => Promise<FindByIdResponse>;
  rename: (httpRequest: HttpRequest) => Promise<RenameResponse>;
  deleteById: (httpRequest: HttpRequest) => Promise<DeleteByIdResponse>;
}
