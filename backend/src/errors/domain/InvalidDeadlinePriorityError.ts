import { DeadlinePriority } from "../../types/DeadLinePriority";
import { DomainError } from './DomainError';

export class InvalidDeadlinePriorityError extends DomainError {
  constructor(priority: string) {
    super(`Deadline priority "${priority}" is invalid. Expected ${Object.values(DeadlinePriority).toString()}`);
    this.name = InvalidDeadlinePriorityError.name;
  }
}
