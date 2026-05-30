import { InvalidDeadlinePriorityError } from '../../../errors/domain/InvalidDeadlinePriorityError';
import { DeadlinePriority } from '../../../types/DeadLinePriority';

export function isValidDeadlinePriority(priority: string): boolean {
  const validPrioritys = Object.values(DeadlinePriority) as string[];
  return validPrioritys.includes(priority);
}
