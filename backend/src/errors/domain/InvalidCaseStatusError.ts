import { CasesStatus } from '../../types/CasesStatus';
import { DomainError } from './DomainError';

export class InvalidCaseStatusError extends DomainError {
  constructor(status: string) {
    super(`Status "${status}" is invalid. Expected ${Object.values(CasesStatus).toString()}`);
    this.name = InvalidCaseStatusError.name;
  }
}
