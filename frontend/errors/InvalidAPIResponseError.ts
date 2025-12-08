export class InvalidAPIResponseError extends Error {
  constructor(message: string, payload?: unknown) {
    super(message);
    this.name = 'InvalidAPIResponseError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidAPIResponseError);
    }
  }
}
