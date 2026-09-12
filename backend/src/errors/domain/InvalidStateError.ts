import { DomainError } from './DomainError.js';

export class InvalidStateError extends DomainError {
  constructor(state: string) {
    super(`State "${state}" is invalid.`);
    this.name = InvalidStateError.name;
  }
}
