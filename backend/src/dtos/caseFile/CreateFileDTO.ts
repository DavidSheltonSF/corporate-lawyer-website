import { WithId } from '../../types/WithId';
import { FileDTO } from './FileDTO';

export type CreateFileDTO = Omit<FileDTO, 'uploadedAt' | 'uploadedBy'> & {
  uploadedBy: string;
};
