export class InvalidEmailError extends Error {
  constructor(email: string) {
    super(`Email '${email}' is invalid. Expected format: example@email.com`);
    this.name = InvalidEmailError.name;
  }
}
