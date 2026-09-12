import { BadRequestError } from '../../errors/presentation/BadRequestError.js';
import { HttpRequest } from '../types/HttpRequest.js';

export function requireBody(httpRequest: HttpRequest): any {
  const body = httpRequest.body;
  if (!body) {
    throw new BadRequestError('Missing request body');
  }
  return body;
}
