import { Case } from './Case';
import { UserBasicInfo } from './UserBasicInfo';
import { WithId } from './WithId';

export type CaseResponse = WithId<
  Omit<Case, "clientId" | "lawyerIds"> & {
    lawyers?: WithId<UserBasicInfo>[];
    client?: WithId<UserBasicInfo>;
  }
>;
