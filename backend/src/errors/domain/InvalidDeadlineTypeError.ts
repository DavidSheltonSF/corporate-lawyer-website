import { DeadlineType } from '../../types/DeadLineType';
import { DomainError } from './DomainError';

export class InvalidDeadlineTypeError extends DomainError {
  constructor(type: string) {
    super(`Deadline type "${type}" is invalid. Expected ${Object.values(DeadlineType).toString()}`);
    this.name = InvalidDeadlineTypeError.name;
  }
}
