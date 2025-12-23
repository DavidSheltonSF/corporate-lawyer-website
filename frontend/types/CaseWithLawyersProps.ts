import { Case } from './Case';
import { LawyerBasicInfoProps } from './LawyerBasicInfoProps';
import { WithId } from './WithId';

export type CaseWithLawyersProps = Case & {
  lawyers: WithId<LawyerBasicInfoProps>[];
};
