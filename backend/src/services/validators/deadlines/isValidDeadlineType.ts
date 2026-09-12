import { DeadlineType } from '../../../types/DeadLineType.js';

export function isValidDeadlineType(type: string): boolean {
  const validTypes = Object.values(DeadlineType) as string[];
  return validTypes.includes(type);
}
