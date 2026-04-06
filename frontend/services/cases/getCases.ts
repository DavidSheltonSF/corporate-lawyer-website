import { API_URL } from '@/config/api';
import { MissingRequiredArgumentError } from '@/errors/MissingRequiredArgumentError';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { Page } from '@/types/Page';
import { WithId } from '@/types/WithId';
import { apiFetch } from '../apiFetch';

export async function getCases(
  queryParams: {
    query?: string;
    page: number;
    limit: number;
    status?: string;
  },
  populate?: string[]
): Promise<Page<WithId<CaseWithRelations>>> {
  if (!queryParams) {
    throw new MissingRequiredArgumentError(getCases.name, 'queryParams');
  }

  const { page, limit, query, status } = queryParams;

  const baseRoute = `${API_URL}/cases`;

  const queryString = `?page=${page}&limit=${limit || ''}&query=${query || ''}&status=${
    status || ''
  }&populate=${populate || ''}`;

  const response = await apiFetch(`${baseRoute}/${queryString}`, {
    method: 'GET',
  });

  const responseJson = await response.json();

  return responseJson.data;
}
