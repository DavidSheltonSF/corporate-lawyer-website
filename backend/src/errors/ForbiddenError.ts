import { BaseHttpError } from './BaseHttpError';

export class ForbiddenError extends BaseHttpError {
  statusCode = 403;
  code = 'FORBIDDEN';
  constructor(message: string) {
    super(message);
  }
}
