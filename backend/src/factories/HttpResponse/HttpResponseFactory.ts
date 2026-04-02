import { HttpResponse } from '../../controllers/types/HttpResponse';
import { HttpStatusCode } from '../../controllers/types/HttpStatusCode';
import { HttpResponseParams } from './HttpResponseParams';

export class HttpResponseFactory {
  private static make<T>(status: HttpStatusCode, params?: HttpResponseParams<T>): HttpResponse<T> {
    return { status, ...params };
  }

  static makeOk<T>(params: HttpResponseParams<T>): HttpResponse<T> {
    return this.make<T>(HttpStatusCode.ok, params);
  }

  static makeCreated<T>(params: HttpResponseParams<T>): HttpResponse<T> {
    return this.make<T>(HttpStatusCode.created, params);
  }

  static makeUnprocessableEntity<T>(params: HttpResponseParams<T>): HttpResponse<T> {
    return this.make<T>(HttpStatusCode.unprocessable_entity, params);
  }

  static makeUnouthorized<T>(params: HttpResponseParams<T>): HttpResponse<T> {
    return this.make<T>(HttpStatusCode.unauthorized, params);
  }

  static makeForbidden<T>(params: HttpResponseParams<T>): HttpResponse<T> {
    return this.make<T>(HttpStatusCode.forbidden, params);
  }

  static makeBadRequest<T>(params: HttpResponseParams<T>): HttpResponse<T> {
    return this.make<T>(HttpStatusCode.bad_request, params);
  }

  static makeNotFound<T>(params: HttpResponseParams<T>): HttpResponse<T> {
    return this.make<T>(HttpStatusCode.not_found, params);
  }

  static makeServerError<T>(params: HttpResponseParams<T>): HttpResponse<T> {
    return this.make<T>(HttpStatusCode.server_error, params);
  }
}
