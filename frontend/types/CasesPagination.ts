import { CaseWithLawyersProps } from './CaseWithLawyersProps';
import { WithId } from './WithId';

export interface CasesPagination {
  cases: WithId<CaseWithLawyersProps>[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
