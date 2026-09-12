import { BaseHttpError } from './BaseHttpError.js';

export class NotFoundError extends BaseHttpError {
  statusCode = 404;
  code = 'NOT_FOUND';
  constructor(message: string) {
    super(message);
  }
}
