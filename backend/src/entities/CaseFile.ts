export interface CaseFile {
  name: string;
  url: string;
  size: number;
  mimeType: string;
  uploadedBy: string;
  uploadedAt?: Date | undefined;
}
