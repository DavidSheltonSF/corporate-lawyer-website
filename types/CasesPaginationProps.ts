import { CaseProps } from "./CaseProps";
import { WithId } from "./WIthId";

export interface CasesPaginationProps {
  data: WithId<CaseProps>[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}