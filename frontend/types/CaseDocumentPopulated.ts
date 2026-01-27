import { CaseDocument } from './CaseDocument';
import { UserIdentity } from './UserIdentity';
import { WithId } from './WithId';

export type CaseDocumentPopulated = Omit<CaseDocument, 'uploadedBy'> & {
  uploadedBy: WithId<UserIdentity>;
};
