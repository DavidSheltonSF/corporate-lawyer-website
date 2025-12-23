import { CaseDocument } from './CaseDocument';
import { CaseStatusEnum } from './CaseStatusEnum';
import { HearingProps } from './HearingProps';

export interface CaseProps {
  clientId: string;
  lawyerIds: string[];
  processNumber: string;
  title: string;
  description?: string;
  court: string;
  courtDivision: string;
  documents?: CaseDocument[];
  hearings?: HearingProps[];
  status: CaseStatusEnum;
  createdAt: Date;
  updatedAt: Date;
}
