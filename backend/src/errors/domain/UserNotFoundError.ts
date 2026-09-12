import { DomainError } from './DomainError.js';

export class UserNotFoundError extends DomainError {
  constructor(id: string) {
    super(`User with id '${id}' was not found.`);
    this.name = UserNotFoundError.name;
  }
}
