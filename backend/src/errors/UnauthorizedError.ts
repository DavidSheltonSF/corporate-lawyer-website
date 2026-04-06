import { BaseHttpError } from './BaseHttpError';

export class UnauthorizedError extends BaseHttpError {
  statusCode = 401;
  code = 'UNAUTHORIZED';
  constructor(message: string) {
    super(message);
  }
}
