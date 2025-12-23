import { Case } from './Case';
import { LawyerBasicInfoProps } from './LawyerBasicInfoProps';
import { WithId } from './WithId';

export type CaseWithLawyers = Case & {
  lawyers: WithId<LawyerBasicInfoProps>[];
};
