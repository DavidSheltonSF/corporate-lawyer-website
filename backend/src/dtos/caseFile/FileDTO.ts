import { UserSlice } from '../../types/UserSlice.js';
import { WithId } from '../../types/WithId.js';

export interface FileDTO {
  ownerId: string;
  name: string;
  url: string;
  downloadUrl: string;
  publicId: string;
  size: number;
  mimeType: string;
  uploadedBy: WithId<UserSlice>;
  uploadedAt: string;
}
