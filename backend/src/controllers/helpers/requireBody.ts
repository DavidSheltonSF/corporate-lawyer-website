import { BadRequestError } from '../../errors/presentation/BadRequestError';
import { HttpRequest } from '../types/HttpRequest';

export function requireBody(httpRequest: HttpRequest): any {
  const body = httpRequest.body;
  if (!body) {
    throw new BadRequestError('Missing request body');
  }
  return body;
}
