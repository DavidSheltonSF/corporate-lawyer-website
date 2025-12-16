import { CaseDocumentProps } from './CaseDocumentProps';
import { HearingProps } from './HearingProps';

export enum CaseStatusEnum {
  em_andamento = 'em_andamento',
  esperando_documentos = 'esperando_documentos',
  aberto = 'aberto',
  encerrado = 'encerrado',
}

export interface CaseProps {
  clientId: string;
  lawyerIds: string[];
  processNumber: string;
  title: string;
  description?: string;
  tribunal: string;
  vara: string;
  documents?: CaseDocumentProps[];
  hearings?: HearingProps[];
  status: CaseStatusEnum;
  createdAt: Date;
  updatedAt: Date;
}
