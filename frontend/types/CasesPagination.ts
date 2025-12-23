import { CaseWithLawyers } from './CaseWithLawyers';
import { WithId } from './WithId';

export interface CasesPagination {
  cases: WithId<CaseWithLawyers>[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
