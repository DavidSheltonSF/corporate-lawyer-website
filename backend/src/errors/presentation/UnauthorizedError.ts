import { BaseHttpError } from './BaseHttpError.js';

export class UnauthorizedError extends BaseHttpError {
  statusCode = 401;
  code = 'UNAUTHORIZED';
  constructor(message: string) {
    super(message);
  }
}
