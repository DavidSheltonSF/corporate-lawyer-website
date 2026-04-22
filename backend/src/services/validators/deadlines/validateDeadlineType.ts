import { InvalidDeadlineTypeError } from '../../../errors/domain/InvalidDeadlineTypeError';
import { DeadlineType } from '../../../types/DeadLineType';

export function validateDeadlineType(type: string) {
  const validTypes = Object.values(DeadlineType) as string[];
  if (!validTypes.includes(type)) {
    throw new InvalidDeadlineTypeError(type);
  }
}
