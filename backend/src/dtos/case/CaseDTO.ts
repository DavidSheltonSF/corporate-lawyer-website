import { CaseLocationDTO } from './CaseLocationDTO';

export interface CaseDTO {
  client: string;
  lawyers: string[];
  processNumber: string;
  title: string;
  description: string;
  court: string; //tribunal
  courtDivision: string; //vara
  files?: string[] | undefined;
  hearings?: string[] | undefined;
  status: string;
  location: CaseLocationDTO;
}
