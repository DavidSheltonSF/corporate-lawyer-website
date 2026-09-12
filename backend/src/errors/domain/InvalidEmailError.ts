import { DomainError } from "./DomainError.js";

export class InvalidEmailError extends DomainError {
  constructor(email: string) {
    super(`Email '${email}' is invalid. Expected format: example@email.com`);
    this.name = InvalidEmailError.name;
  }
}
