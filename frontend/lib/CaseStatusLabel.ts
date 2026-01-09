import { CaseStatusEnum } from "@/types/CaseStatusEnum"


export const CaseStatusLabel: Record<CaseStatusEnum, string> = {
  [CaseStatusEnum.aberto]: 'Aberto',
  [CaseStatusEnum.em_andamento]: 'Em andamento',
  [CaseStatusEnum.esperando_documentos]: 'Esperando documentos',
  [CaseStatusEnum.encerrado]: 'Encerrado',
};
