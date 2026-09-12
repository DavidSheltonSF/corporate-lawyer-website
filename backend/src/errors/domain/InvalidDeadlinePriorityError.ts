import { DeadlinePriority } from "../../types/DeadLinePriority.js";
import { DomainError } from './DomainError.js';

export class InvalidDeadlinePriorityError extends DomainError {
  constructor(priority: string) {
    super(`Deadline priority "${priority}" is invalid. Expected ${Object.values(DeadlinePriority).toString()}`);
    this.name = InvalidDeadlinePriorityError.name;
  }
}
