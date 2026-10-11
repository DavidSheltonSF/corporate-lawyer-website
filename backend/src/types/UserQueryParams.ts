import { PageParams } from './PageParams.js';

export interface UserQueryParams extends PageParams {
  query?: string | undefined;
}
