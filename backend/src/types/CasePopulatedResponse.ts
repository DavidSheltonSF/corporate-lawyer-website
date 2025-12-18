import { Case } from "./Case";
import { UserBasicInfo } from "./UserBasicInfo";

export type CasePopulatedResponse = Case & {client: UserBasicInfo, lawyers: UserBasicInfo[]}