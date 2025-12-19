import { Case } from './Case';
import { WithId } from './WithId';

export type CaseListResponse = {
  cases: WithId<Case>[];
  total: number;
  totalPages: number;
};
