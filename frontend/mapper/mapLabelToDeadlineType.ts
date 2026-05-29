import { DeadlineCountingType } from '@/types/DeadlineCountingType';
import { DeadlineType } from '@/types/DeadlineType';

export function mapLabelToDeadlineType(label: string): DeadlineType {
  switch (label.toLowerCase()) {
    case 'audiência':
      return 'AUDIENCIA';

    case 'contestação':
      return 'CONTESTACAO';

    case 'manifestação':
      return 'MANIFESTACAO';

    case 'pagamento':
      return 'PAGAMENTO';

    case 'réplica':
      return 'REPLICA';

    case 'recurso':
      return 'RECURSO';

    case 'outro':
      return 'OUTRO';

    default:
      throw Error(`Invalid deadline type ${label}`);
  }
}
