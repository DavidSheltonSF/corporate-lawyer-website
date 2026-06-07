import { WithId } from '../../types/WithId';
import { CaseFileDTO } from './CaseFileDTO';

export type CreateCaseFileDTO = Omit<CaseFileDTO, 'uploadedAt' | 'uploadedBy'> & {
  uploadedBy: string;
};
