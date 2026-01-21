import { UserIdentity } from '../../types/UserIdentity';
import { WithId } from '../../types/WithId';

export interface CaseFileDTO {
  name: string;
  url: string;
  uploadedBy: WithId<UserIdentity>;
  case: string;
  createdAt: string;
}
