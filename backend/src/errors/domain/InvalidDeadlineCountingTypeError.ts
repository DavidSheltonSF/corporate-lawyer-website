import { DeadlineCountingType } from '../../types/DeadlineCountingType';
import { DomainError } from './DomainError';

export class InvalidDeadlineCountingTypeError extends DomainError {
  constructor(type: string) {
    super(`Deadline counting type "${type}" is invalid. Expected ${Object.values(DeadlineCountingType).toString()}`);
    this.name = InvalidDeadlineCountingTypeError.name;
  }
}
