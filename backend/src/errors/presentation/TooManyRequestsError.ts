import { BaseHttpError } from './BaseHttpError.js';

export class TooManyRequestsError extends BaseHttpError {
  statusCode = 429;
  code = 'TOO_MANY_REQUESTS';
  constructor() {
    super('Too many requests, try again later');
  }
}
