export class MissingContextError extends Error {
  constructor(context: string) {
    super(`Context ${context} must be used within its provider`);
  }
}
