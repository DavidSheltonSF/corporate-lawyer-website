import { DomainError } from './DomainError';

export class DuplicateUniqueFieldError extends DomainError {
  constructor(keyValue: Record<string, any>) {
    super(`Duplicate unique field. KeyValue: ${JSON.stringify(keyValue)}"`);
    this.name = DuplicateUniqueFieldError.name;
  }
}
