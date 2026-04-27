import { DomainError } from './DomainError';

export class CaseNotFoundError extends DomainError {
  constructor(id: string) {
    super(`Case with id '${id}' was not found.`);
    this.name = CaseNotFoundError.name;
  }
}
