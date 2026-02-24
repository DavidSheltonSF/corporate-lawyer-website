export interface CaseFile {
  name: string;
  url: string;
  size: number;
  mimeType: string;
  caseId: string;
  uploadedBy: string;
  uploadedAt?: Date | undefined;
}
