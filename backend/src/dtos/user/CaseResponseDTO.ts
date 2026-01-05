export interface CaseResponseDTO {
  client: string;
  lawyers: string[];
  processNumber: string;
  title: string;
  description: string;
  court: string; //tribunal
  courtDivision: string; //vara
  documents?: string[] | undefined;
  hearings?: string[] | undefined;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
