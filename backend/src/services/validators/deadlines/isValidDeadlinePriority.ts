import { DeadlinePriority } from '../../../types/DeadLinePriority.js';

export function isValidDeadlinePriority(priority: string): boolean {
  const validPrioritys = Object.values(DeadlinePriority) as string[];
  return validPrioritys.includes(priority);
}
