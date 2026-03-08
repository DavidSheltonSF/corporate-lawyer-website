import { HttpCode } from './HttpCode';
import { HttpResponse } from './HttpResponse';
import { HttpResponseParams } from './HttpResponseParams';

export class HttpResponseFactory {
  private static make<T>(code: HttpCode, params: HttpResponseParams<T>): HttpResponse<T> {
    return { code, ...params };
  }

  static makeOk<T>(params: HttpResponseParams<T>): HttpResponse<T> {
    return this.make<T>(HttpCode.ok, params);
  }

  static makeCreated<T>(params: HttpResponseParams<T>): HttpResponse<T> {
    return this.make<T>(HttpCode.created, params);
  }

  static makeUnprocessableEntity<T>(params: HttpResponseParams<T>): HttpResponse<T> {
    return this.make<T>(HttpCode.unprocessable_entity, params);
  }

  static makeUnouthorized<T>(params: HttpResponseParams<T>): HttpResponse<T> {
    return this.make<T>(HttpCode.unouthorized, params);
  }

  static makeBadRequest<T>(params: HttpResponseParams<T>): HttpResponse<T> {
    return this.make<T>(HttpCode.bad_request, params);
  }

  static makeNotFound<T>(params: HttpResponseParams<T>): HttpResponse<T> {
    return this.make<T>(HttpCode.not_found, params);
  }

  static makeServerError<T>(params: HttpResponseParams<T>): HttpResponse<T> {
    return this.make<T>(HttpCode.server_error, params);
  }
}
