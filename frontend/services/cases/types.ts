import { ActionResponse } from '@/types/ActionResponse';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { Page } from '@/types/Page';
import { WithId } from '@/types/WithId';

export type CasePage = Page<WithId<CaseWithRelations>>;
export type GetCasesResponse = ActionResponse<CasePage>;
export interface GetCasesParams {
  search?: string;
  page: number;
  limit: number;
  status?: string;
  populate?: string[];
}
export type CasesFetcher = (params: GetCasesParams) => Promise<GetCasesResponse>;
