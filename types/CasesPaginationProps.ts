import { CaseProps } from './CaseProps';
import { WithId } from './WithId';

export interface CasesPaginationProps {
  cases: WithId<CaseProps>[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
