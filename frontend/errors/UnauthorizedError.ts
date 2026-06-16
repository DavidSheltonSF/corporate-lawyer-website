export class UnauthorizedError extends Error {
  constructor(message: string = 'User not authenticated') {
    super(message);
    this.name = UnauthorizedError.name;
  }
}
