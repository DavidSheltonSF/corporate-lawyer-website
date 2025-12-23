import { CaseDocument } from "./CaseDocument";
import { UserBasicInfo } from "./UserBasicInfo";
import { WithId } from "./WithId";

export type CaseDocumentPopulated = Omit<CaseDocument, 'uploadedBy'> & {
  uploadedBy: WithId<UserBasicInfo>;
};
