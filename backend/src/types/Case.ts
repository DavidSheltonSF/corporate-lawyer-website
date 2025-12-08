import { CaseDocument } from './CaseDocument';
import { CaseStatusEnum } from './CaseStatusEnum';
import { Hearing } from './Hearing';

export interface Case{
  clientId: string;
  lawyerIds: string[];
  processNumber: string;
  title: string;
  description?: string;
  tribunal?: string;
  vara?: string;
  documents?: CaseDocument[];
  hearings?: Hearing[];
  status: CaseStatusEnum;
  createdAt: Date;
  updatedAt: Date;
}
