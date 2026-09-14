import { CaseLocationDTO } from './CaseLocationDTO.js';

export interface CreateCaseDTO {
  client: string;
  lawyers: string[];
  caseNumber: string;
  title: string;
  description: string;
  court: string; //tribunal
  courtDivision: string; //vara
  status: string;
  location: CaseLocationDTO;
}
