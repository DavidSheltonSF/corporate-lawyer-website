import { HttpRequest } from '../types/HttpRequest.js';
import { DeleteByIdResponse, FindByIdResponse, RenameResponse } from './responses.js';

export interface IFileController {
  findById: (httpRequest: HttpRequest) => Promise<FindByIdResponse>;
  rename: (httpRequest: HttpRequest) => Promise<RenameResponse>;
  deleteById: (httpRequest: HttpRequest) => Promise<DeleteByIdResponse>;
}
