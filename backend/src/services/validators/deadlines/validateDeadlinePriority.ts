import { InvalidDeadlinePriorityError } from '../../../errors/domain/InvalidDeadlinePriorityError';
import { DeadlinePriority } from '../../../types/DeadLinePriority';

export function validateDeadlinePriority(priority: string) {
  const validPrioritys = Object.values(DeadlinePriority) as string[];
  if (!validPrioritys.includes(priority)) {
    throw new InvalidDeadlinePriorityError(priority);
  }
}
