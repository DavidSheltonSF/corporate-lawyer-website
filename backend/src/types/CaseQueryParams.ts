import { PageParams } from './PageParams.js';

export interface CaseQueryParams extends PageParams {
  query?: string | undefined;
  clientId?: string | undefined;
  status?: string | undefined;
}
