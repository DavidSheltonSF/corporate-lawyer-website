import { UserSlice } from '../../types/UserSlice';
import { WithId } from '../../types/WithId';

export interface CaseFileDTO {
  name: string;
  url: string;
  publicId: string;
  size: number;
  mimeType: string;
  uploadedBy: WithId<UserSlice>;
  uploadedAt: string;
}
