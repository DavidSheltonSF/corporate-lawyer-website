import { DomainError } from './DomainError';

export class InvalidCaseTitleError extends DomainError {
  constructor(title: string) {
    super(`Title "${title}" is invalid. Expected a string with between 15 and 100 characters.`);
    this.name = InvalidCaseTitleError.name;
  }
}
