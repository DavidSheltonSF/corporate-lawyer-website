import { CaseStatusEnum } from '../types/CaseStatusEnum';

export interface Case {
  client: String;
  lawyers: String[];
  processNumber: string;
  title: string;
  description: string;
  court: string; //tribunal
  courtDivision: string; //vara
  documents?: string[] | undefined;
  hearings?: string[] | undefined;
  status: CaseStatusEnum;
  createdAt: Date;
  updatedAt: Date;
}
