import { CaseDocumentProps } from "./CaseDocumentProps";
import { HearingProps } from "./HearingProps";

export type CaseStatus = 'aberto' | 'em_progresso' | 'esperando_documentos' | 'encerrado';

export interface CaseProps {
  id?: string;
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
