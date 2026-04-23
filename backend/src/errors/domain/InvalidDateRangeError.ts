import { DomainError } from './DomainError';

export class InvalidDateRangeError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = InvalidDateRangeError.name;
  }
}
