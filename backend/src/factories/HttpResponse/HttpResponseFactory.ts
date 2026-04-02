import { HttpResponse } from '../../controllers/types/HttpResponse';
import { HttpStatusCode } from '../../controllers/types/HttpStatusCode';
import { HttpResponseParams } from './HttpResponseParams';

export class HttpResponseFactory {
  private static make<T>(status: HttpStatusCode, params?: HttpResponseParams<T>): HttpResponse<T> {
    return { status, ...(params ?? {}) };
  }

  static makeOk<T>(data: T): HttpResponse<T> {
    return this.make<T>(HttpStatusCode.ok, { data });
  }

  static makeCreated<T>(data: T): HttpResponse<T> {
    return this.make<T>(HttpStatusCode.created, { data });
  }

  static makeNoContent(): HttpResponse<null> {
    return this.make<null>(HttpStatusCode.no_content);
  }

  static makeUnprocessableEntity(message: string): HttpResponse<null> {
    return this.make<null>(HttpStatusCode.unprocessable_entity, { message });
  }

  static makeUnauthorized(message: string): HttpResponse<null> {
    return this.make<null>(HttpStatusCode.unauthorized, { message });
  }

  static makeForbidden(message: string): HttpResponse<null> {
    return this.make<null>(HttpStatusCode.forbidden, { message });
  }

  static makeBadRequest(message: string): HttpResponse<null> {
    return this.make<null>(HttpStatusCode.bad_request, { message });
  }

  static makeNotFound(message: string): HttpResponse<null> {
    return this.make<null>(HttpStatusCode.not_found, { message });
  }

  static makeServerError(message: string): HttpResponse<null> {
    return this.make<null>(HttpStatusCode.server_error, { message });
  }
}
