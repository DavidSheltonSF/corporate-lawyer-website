import { DeadlineType } from '../../types/DeadLineType.js';
import { DomainError } from './DomainError.js';

export class InvalidDeadlineTypeError extends DomainError {
  constructor(type: string) {
    super(`Deadline type "${type}" is invalid. Expected ${Object.values(DeadlineType).toString()}`);
    this.name = InvalidDeadlineTypeError.name;
  }
}
