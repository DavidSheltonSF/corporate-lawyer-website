export class MissingRequiredArgumentError extends Error {
  constructor(functionName: string, arg: string) {
    super(`${functionName} is missing required arguments: ${arg}`);
    this.name = 'MissingRequiredArgumentError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MissingRequiredArgumentError);
    }
  }
}
