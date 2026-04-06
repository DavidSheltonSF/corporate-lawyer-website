import { BaseHttpError } from './BaseHttpError';

export class BadRequestError extends BaseHttpError {
  statusCode = 400;
  code = 'BAD_REQUEST';
  constructor(message: string) {
    super(message);
  }
}
