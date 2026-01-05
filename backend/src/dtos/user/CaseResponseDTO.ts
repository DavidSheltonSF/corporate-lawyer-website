export interface CaseResponseDTO {
  client: string;
  lawyers: string[];
  processNumber: string;
  title: string;
  description: string;
  court: string; //tribunal
  courtDivision: string; //vara
  documents?: string[];
  hearings?: string[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
