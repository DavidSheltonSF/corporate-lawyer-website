import { UserBasicInfo } from "./UserBasicInfo";
import { WithId } from "./WithId";

export interface CaseDocumentPopulated {
  name: string;
  url: string;
  uploadedAt: Date;
  uploadedBy: WithId<UserBasicInfo>;
}
