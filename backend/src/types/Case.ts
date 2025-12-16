import { CaseStatusEnum } from './CaseStatusEnum';

export interface Case{
  clientId: string;
  lawyerIds: string[];
  processNumber: string;
  title: string;
  description?: string;
  tribunal?: string;
  vara?: string;
  documentIds?: string[];
  hearingIds: string[];
  status: CaseStatusEnum;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
