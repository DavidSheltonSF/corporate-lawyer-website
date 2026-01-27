import { Case } from './Case';
import { UserIdentity } from './UserIdentity';
import { WithId } from './WithId';

export type CaseWithLawyers = Case & {
  lawyers: WithId<UserIdentity>[];
};
