import { CaseStatusEnum } from '@/types/CaseStatusEnum';

export function mapLabelToCaseStatus(label: string): CaseStatusEnum {
  switch (label.toLowerCase()) {
    case 'aberto':
      return CaseStatusEnum.open;

    case 'encerrado':
      return CaseStatusEnum.closed;

    default:
      throw Error(`Invalid case status ${label}`);
  }
}
