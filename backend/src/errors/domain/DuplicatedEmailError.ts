import { DomainError } from './DomainError.js';

export class DuplicatedEmailError extends DomainError {
  constructor(email: string) {
    super(`Email '${email}' already exists.`);
    this.name = DuplicatedEmailError.name;
  }
}
