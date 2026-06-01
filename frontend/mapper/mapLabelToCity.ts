import { City } from '@/types/City';

export function mapLabelToCity(label: string): City | null {
  switch (label.toLowerCase()) {
    case 'rio de janeiro':
      return City.RIO_DE_JANEIRO;

    case 'duque de caxias':
      return City.DUQUE_DE_CAXIAS;

    case 'belford roxo':
      return City.BELFORD_ROXO;

    default:
      return null;
  }
}
