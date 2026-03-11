import { CasesStatus } from '../types/CasesStatus';

export interface Case {
  client: string;
  lawyers: string[];
  processNumber: string;
  title: string;
  description: string;
  court: string; //tribunal
  courtDivision: string; //vara
  files?: string[] | undefined;
  hearings?: string[] | undefined;
  status: CasesStatus;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
