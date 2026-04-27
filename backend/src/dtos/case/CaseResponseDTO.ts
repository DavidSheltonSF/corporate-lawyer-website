import { CaseLocalizationDTO } from './CaseLocalizationDTO';

export interface CaseResponseDTO {
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
  localization: CaseLocalizationDTO;
}
