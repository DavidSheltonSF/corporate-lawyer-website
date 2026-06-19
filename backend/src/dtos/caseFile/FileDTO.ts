import { UserSlice } from '../../types/UserSlice';
import { WithId } from '../../types/WithId';

export interface FileDTO {
  ownerId: string;
  name: string;
  url: string;
  download_url: string;
  publicId: string;
  size: number;
  mimeType: string;
  uploadedBy: WithId<UserSlice>;
  uploadedAt: string;
}
