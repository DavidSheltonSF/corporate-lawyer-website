import { HttpCode } from './HttpCode';
import { HttpResponse } from './HttpResponse';
import { HttpResponseParams } from './HttpResponseParams';

export class HttpResponseFactory {
  private static make(code: HttpCode, params: HttpResponseParams): HttpResponse {
    return { code, ...params };
  }

  static makeOk(params: HttpResponseParams): HttpResponse {
    return this.make(HttpCode.ok, params);
  }

  static makeUnouthorized(params: HttpResponseParams): HttpResponse {
    return this.make(HttpCode.unouthorized, params);
  }

  static makeBadRequest(params: HttpResponseParams): HttpResponse {
    return this.make(HttpCode.bad_request, params);
  }

  static makeNotFound(params: HttpResponseParams): HttpResponse {
    return this.make(HttpCode.not_found, params);
  }

  static makeServerError(params: HttpResponseParams): HttpResponse {
    return this.make(HttpCode.server_error, params);
  }
}
