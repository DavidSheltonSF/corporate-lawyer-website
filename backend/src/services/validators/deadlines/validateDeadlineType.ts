import { DeadlineType } from '../../../types/DeadLineType';

export function validateDeadlineType(type: string): boolean {
  const validTypes = Object.values(DeadlineType) as string[];
  return validTypes.includes(type);
}
