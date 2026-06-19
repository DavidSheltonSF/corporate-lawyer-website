import { UserSlice } from './UserSlice';
import { WithId } from './WithId';

export interface CaseFile {
  name: string;
  url: string;
  downloadUrl: string;
  size: string;
  mimeType: string;
  uploadedBy: WithId<UserSlice>;
  uploadedAt: Date;
}
