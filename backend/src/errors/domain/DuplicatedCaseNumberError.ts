import { DomainError } from './DomainError.js';

export class DuplicatedCaseNumberError extends DomainError {
  constructor(caseNumber: string) {
    super(`A case with number '${caseNumber}' already exists`);
    this.name = DuplicatedCaseNumberError.name;
  }
}