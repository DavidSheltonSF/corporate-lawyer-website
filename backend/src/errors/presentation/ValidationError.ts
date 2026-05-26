import { BaseHttpError } from './BaseHttpError';

export class ValidationError extends BaseHttpError {
  statusCode = 400;
  code = 'VALIDATION_ERROR';
  constructor(
    message: string,
    public details?: unknown
  ) {
    super(message, details);
  }
}
