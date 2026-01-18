import { UserName } from '../../types/UserName';
import { WithId } from '../../types/WithId';

export interface CaseDocumentDTO {
  name: string;
  url: string;
  uploadedBy: WithId<UserName>;
  uploadedAt: string;
}
