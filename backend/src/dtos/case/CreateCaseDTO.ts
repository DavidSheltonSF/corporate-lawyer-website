import { CaseLocalizationDTO } from "./CaseLocalizationDTO";

export interface CreateCaseDTO {
  client: string;
  lawyers: string[];
  processNumber: string;
  title: string;
  description: string;
  court: string; //tribunal
  courtDivision: string; //vara
  status: string;
  localization: CaseLocalizationDTO;
}
