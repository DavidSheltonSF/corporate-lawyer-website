import { UserName } from '../../types/UserName';
import { WithId } from '../../types/WithId';

export interface CaseFileResponseDTO {
  name: string;
  url: string;
  uploadedBy: WithId<UserName>;
  uploadedAt: string;
}
