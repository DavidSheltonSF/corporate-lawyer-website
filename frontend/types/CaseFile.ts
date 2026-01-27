import { UserIdentity } from './UserIdentity';
import { WithId } from './WithId';

export interface CaseFile {
  name: string;
  url: string;
  size: string;
  mimeType: string;
  uploadedBy: WithId<UserIdentity>;
  uploadedAt: Date;
}
