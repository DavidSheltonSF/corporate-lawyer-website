import { CaseDocumentProps } from './CaseDocumentProps';
import { HearingProps } from './HearingProps';

export type CaseStatus = 'aberto' | 'em_progresso' | 'esperando_documentos' | 'encerrado';

export enum CaseStatusEnum {
  em_progresso = 'Em progresso',
  esperando_documentos = 'Esperando Documentos',
  aberto = 'Aberto',
  encerrado = 'Encerrado',
}

export interface CaseProps {
  clientId: string;
  lawyerIds: string[];
  processNumber: string;
  title: string;
  description?: string;
  tribunal?: string;
  vara?: string;
  documents?: CaseDocumentProps[];
  hearings?: HearingProps[];
  status: CaseStatus;
  createdAt: Date;
  updatedAt: Date;
}
