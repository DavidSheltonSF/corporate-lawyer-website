import { Types } from 'mongoose';
import { CaseStatusEnum } from './CaseStatusEnum';

export interface Case {
  client: Types.ObjectId;
  lawyers: Types.ObjectId[];
  processNumber: string;
  title: string;
  description?: string;
  court?: string; //tribunal
  courtDivision?: string; //vara
  documents?: Types.ObjectId[];
  hearings?: Types.ObjectId[];
  status: CaseStatusEnum;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
