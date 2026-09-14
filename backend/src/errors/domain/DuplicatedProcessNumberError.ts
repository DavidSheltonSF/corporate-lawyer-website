import { DomainError } from './DomainError.js';

export class DuplicatedProcessNumberError extends DomainError {
  constructor(processNumber: string) {
    super(`A case with number '${processNumber}' already exists`);
    this.name = DuplicatedProcessNumberError.name;
  }
}
