import { DeadlineStatus } from "../../types/DeadLineStatus";
import { DomainError } from './DomainError';

export class InvalidDeadlineStatusError extends DomainError {
  constructor(status: string) {
    super(`Deadline status "${status}" is invalid. Expected ${Object.values(DeadlineStatus).toString()}`);
    this.name = InvalidDeadlineStatusError.name;
  }
}
