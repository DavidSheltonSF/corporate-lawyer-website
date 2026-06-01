import { BrazilState } from '@/types/BrazilState';

export function mapLabelToBrazilState(label: string): BrazilState | null {
  switch (label.toLowerCase()) {
    case 'rio de janeiro':
      return BrazilState.RIO_DE_JANEIRO;

    default:
     return null
  }
}
