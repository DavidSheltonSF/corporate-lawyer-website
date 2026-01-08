import { Case } from '../entities/Case';
import { CaseDocument } from '../entities/CaseDocument';
import { Hearing } from '../entities/Hearing';
import { UserName } from './UserName';

export type CasePopulated = Omit<Case, 'client' | 'lawyers' | 'documents' | 'hearings'> & {
  client: UserName;
  lawyers: UserName[];
  documents?: CaseDocument[];
  hearings?: Hearing[];
};
