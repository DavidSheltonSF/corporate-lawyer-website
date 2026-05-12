import { UserSlice } from '../../types/UserSlice';
import { WithId } from '../../types/WithId';

export interface CaseFileDTO {
  name: string;
  url: string;
  size: number;
  mimeType: string;
  uploadedBy: WithId<UserSlice>;
  uploadedAt: string;
}
