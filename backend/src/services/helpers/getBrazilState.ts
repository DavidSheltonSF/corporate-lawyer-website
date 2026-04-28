import { InvalidStateError } from '../../errors/domain/InvalidStateError';
import { BrazilianState } from '../../types/BrazilianState';

export function getBrazilState(state: string): BrazilianState {
  switch (state) {
    case BrazilianState.RIO_DE_JANEIRO:
      return BrazilianState.RIO_DE_JANEIRO;

    default:
      throw new InvalidStateError(state);
  }
}
