import { API_URL } from '@/config/api';
import { MissingRequiredArgumentError } from '@/errors/MissingRequiredArgumentError';
import { getTokenFromCookies } from '@/lib/getTokenFromCookies';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { Page } from '@/types/Page';
import { WithId } from '@/types/WithId';
import { apiFetch } from './apiFetch';

export async function getMyCases(
  queryParams: {
    query?: string;
    page: number;
    limit: number;
    status?: string;
  },
  populate?: string[]
): Promise<Page<WithId<CaseWithRelations>>> {
  if (!queryParams) {
    throw new MissingRequiredArgumentError(getMyCases.name, 'queryParams');
  }

  const { page, limit, query, status } = queryParams;

  const baseRoute = `${API_URL}/my/cases`;

  const queryString = `?page=${page}&limit=${limit || ''}&query=${query || ''}&status=${
    status || ''
  }&populate=${populate || ''}`;

  const token = await getTokenFromCookies();

  const response = await apiFetch(`${baseRoute}/${queryString}`, {
    headers: {
      Authorization: token,
    },
  });

  const responseJson = await response.json();

  return responseJson.data;
}
