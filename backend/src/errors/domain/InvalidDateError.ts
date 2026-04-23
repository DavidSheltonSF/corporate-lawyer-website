import { DomainError } from './DomainError';

export class InvalidDateError extends DomainError {
  constructor(date: string) {
    super(`Date '${date}' is invalid. Expected format YYYY-MM-DD`);
    this.name = InvalidDateError.name;
  }
}
