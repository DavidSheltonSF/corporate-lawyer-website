import { WithId } from '../../types/WithId.js';
import { FileDTO } from './FileDTO.js';

export type CreateFileDTO = Omit<FileDTO, 'uploadedAt' | 'uploadedBy'> & {
  uploadedBy: string;
};
