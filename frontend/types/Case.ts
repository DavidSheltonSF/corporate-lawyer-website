import { CaseFile } from './CaseFile';
import { CaseStatusEnum } from './CaseStatusEnum';
import { HearingProps } from './HearingProps';

export interface Case {
  clientId: string;
  lawyerIds: string[];
  processNumber: string;
  title: string;
  description?: string;
  court: string;
  courtDivision: string;
  files: CaseFile[];
  hearings: HearingProps[];
  status: CaseStatusEnum;
  createdAt: Date;
  updatedAt: Date;
}
