import { CaseStatusEnum } from '@/types/CaseStatusEnum';

export const CaseStatusLabel: Record<CaseStatusEnum, string> = {
  [CaseStatusEnum.open]: 'Aberto',
  [CaseStatusEnum.closed]: 'Encerrado',
};
