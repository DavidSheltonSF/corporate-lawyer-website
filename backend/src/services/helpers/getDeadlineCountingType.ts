import { InvalidDeadlineCountingTypeError } from '../../errors/domain/InvalidDeadlineCountingTypeError.js';
import { DeadlineCountingType } from '../../types/DeadlineCountingType.js';

export function getDeadlineCountingType(countingType: string): DeadlineCountingType {
  switch (countingType) {
    case DeadlineCountingType.DIAS_CORRIDOS:
      return DeadlineCountingType.DIAS_CORRIDOS;

    case DeadlineCountingType.DIAS_UTEIS:
      return DeadlineCountingType.DIAS_UTEIS;
    default:
      throw new InvalidDeadlineCountingTypeError(countingType);
  }
}
