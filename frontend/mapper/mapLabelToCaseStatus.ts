import { CaseStatusEnum } from '@/types/CaseStatusEnum';

export function mapLabelToCaseStatus(label: string): CaseStatusEnum | null {
  switch (label.toLowerCase()) {
    case 'aberto':
      return CaseStatusEnum.open;

    case 'arquivado':
      return CaseStatusEnum.closed;

    default:
      return null;
  }
}
