import { BrazilState } from '@/types/BrazilState';

export function mapLabelToBrazilState(label: string): BrazilState {
  switch (label.toLowerCase()) {
    case 'rio de janeiro':
      return BrazilState.RIO_DE_JANEIRO;

    default:
      throw Error(`Invalid case status ${label}`);
  }
}
