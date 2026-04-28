import { DomainError } from './DomainError';

export class InvalidCityError extends DomainError {
  constructor(city: string) {
    super(`City "${city}" is invalid.`);
    this.name = InvalidCityError.name;
  }
}
