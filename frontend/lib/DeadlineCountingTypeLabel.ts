import { DeadlineCountingType } from '@/types/DeadlineCountingType';

export const DeadlineCountingTypeLabel: Record<DeadlineCountingType, string> = {
  [DeadlineCountingType.DIAS_UTEIS]: 'Dias úteis',
  [DeadlineCountingType.DIAS_CORRIDOS]: 'Dias corridos',
};
