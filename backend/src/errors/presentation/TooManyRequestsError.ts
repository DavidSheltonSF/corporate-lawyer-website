import { BaseHttpError } from './BaseHttpError';

export class TooManyRequestsError extends BaseHttpError {
  statusCode = 429;
  code = 'NOT_FOUND';
  constructor() {
    super('Too many requests, try again later');
  }
}
