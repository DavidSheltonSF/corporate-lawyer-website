import { Types } from 'mongoose';
import { CaseStatusEnum } from './CaseStatusEnum';

export interface Case {
  clientId: Types.ObjectId;
  lawyerIds: Types.ObjectId[];
  processNumber: string;
  title: string;
  description?: string;
  court?: string; //tribunal
  courtDivision?: string; //vara
  documentIds?: Types.ObjectId[];
  hearingIds?: Types.ObjectId[];
  status: CaseStatusEnum;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
