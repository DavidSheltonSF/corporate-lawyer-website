import { CaseProps } from './CaseProps';
import { LawyerBasicInfoProps } from './LawyerBasicInfoProps';
import { WithId } from './WithId';

export type CaseWithLawyersProps = CaseProps & {
  lawyers: WithId<LawyerBasicInfoProps>[];
};
