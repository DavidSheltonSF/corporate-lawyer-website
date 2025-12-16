import { CaseStatusEnum } from "@/types/CaseStatusEnum"


export const caseStatusLabel: Record<CaseStatusEnum, string> = {
  [CaseStatusEnum.aberto]: 'Aberto',
  [CaseStatusEnum.em_andamento]: 'Em andamento',
  [CaseStatusEnum.esperando_documentos]: 'Esperando documentos',
  [CaseStatusEnum.encerrado]: 'Encerrado',
};
