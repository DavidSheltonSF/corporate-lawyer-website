import { CaseProps } from "./CaseProps";
import { WithId } from "./WIthId";

export interface CasesPaginationProps {
  cases: WithId<CaseProps>[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}