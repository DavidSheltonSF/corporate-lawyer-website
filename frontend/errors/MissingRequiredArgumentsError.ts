export class MissingRequiredArgumentsError extends Error {
  constructor(functionName: string, args: string[]) {
    super(`${functionName} is missing required arguments: ${args.join(', ')}`);
    this.name = 'MissingRequiredArgumentsError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MissingRequiredArgumentsError);
    }
  }
}
