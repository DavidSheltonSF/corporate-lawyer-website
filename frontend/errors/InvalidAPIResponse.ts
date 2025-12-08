export class InvalidAPIResponse extends Error {
  constructor(message: string, payload?: unknown) {
    super(message);
    this.name = 'InvalidAPIResponse';
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidAPIResponse);
    }
  }
}
