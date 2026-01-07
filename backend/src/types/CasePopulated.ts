import { Case } from '../entities/Case';
import { CaseDocument } from '../entities/CaseDocument';
import { Hearing } from '../entities/Hearing';
import { UserBasicInfo } from './UserBasicInfo';

export type CasePopulated = Omit<Case, 'client' | 'lawyers' | 'documents' | 'hearings'> & {
  client: UserBasicInfo;
  lawyers: UserBasicInfo[];
  documents?: CaseDocument[];
  hearings?: Hearing[];
};
