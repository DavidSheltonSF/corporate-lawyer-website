import { Case } from './Case';
import { UserBasicInfo } from './UserBasicInfo';
import { WithId } from './WithId';

export type CaseWithLawyers = Case & {
  lawyers: WithId<UserBasicInfo>[];
};
