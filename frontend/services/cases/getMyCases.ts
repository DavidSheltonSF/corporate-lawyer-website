import { API_URL } from '@/config/api';
import { MissingRequiredArgumentError } from '@/errors/MissingRequiredArgumentError';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { Page } from '@/types/Page';
import { WithId } from '@/types/WithId';
import { apiFetch } from '../apiFetch';
import { ActionResponse } from '@/types/ActionResponse';
import { makeActionResponse } from '@/factories/makeActionResponse';

export async function getMyCases(
  queryParams: {
    query?: string;
    page: number;
    limit: number;
    status?: string;
  },
  populate?: string[]
): Promise<ActionResponse<Page<WithId<CaseWithRelations>>>> {
  if (!queryParams) {
    throw new MissingRequiredArgumentError(getMyCases.name, 'queryParams');
  }

  const { page, limit, query, status } = queryParams;

  const baseRoute = `${API_URL}/my/cases`;

  const queryString = `?page=${page}&limit=${limit || ''}&query=${query || ''}&status=${
    status || ''
  }&populate=${populate || ''}`;

  const response = await apiFetch(`${baseRoute}/${queryString}`);
  return makeActionResponse(response);
}
