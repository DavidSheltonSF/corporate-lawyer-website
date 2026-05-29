import { DeadlineCountingType } from '@/types/DeadlineCountingType';

export function mapLabelToDeadlineCountintType(label: string): DeadlineCountingType {
  switch (label.toLowerCase()) {
    case 'dias úteis':
      return DeadlineCountingType.DIAS_UTEIS;

    case 'dias corridos':
      return DeadlineCountingType.DIAS_CORRIDOS;

    default:
      throw Error(`Invalid deadline counting type ${label}`);
  }
}
