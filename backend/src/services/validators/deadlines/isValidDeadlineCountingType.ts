import { DeadlineCountingType } from '../../../types/DeadlineCountingType';

export function isValidDeadlineCountingType(type: string): boolean {
  const validTypes = Object.values(DeadlineCountingType) as string[];
  return validTypes.includes(type);
}
