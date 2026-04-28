import { InvalidStateError } from '../../errors/domain/InvalidStateError';
import { BrazilState } from '../../types/BrazilState';

export function getBrazilState(state: string): BrazilState {
  switch (state) {
    case BrazilState.RIO_DE_JANEIRO:
      return BrazilState.RIO_DE_JANEIRO;

    default:
      throw new InvalidStateError(state);
  }
}
