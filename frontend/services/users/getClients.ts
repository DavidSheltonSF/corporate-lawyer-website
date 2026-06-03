import { API_URL } from '@/config/api';
import { MissingRequiredArgumentError } from '@/errors/MissingRequiredArgumentError';
import { Page } from '@/types/Page';
import { SafeUser } from '@/types/SafeUser';
import { WithId } from '@/types/WithId';
import { apiFetch } from '../apiFetch';
import { ActionResponse } from '@/types/ActionResponse';
import { makeActionResponse } from '@/factories/makeActionResponse';

export async function getClients(queryParams: {
  query?: string;
  page: number;
  limit: number;
  status?: string;
}): Promise<ActionResponse<Page<WithId<SafeUser>>>> {
  if (!queryParams) {
    throw new MissingRequiredArgumentError(getClients.name, 'queryParams');
  }

  const { page, limit, query, status } = queryParams;

  const baseRoute = `${API_URL}/clients`;

  const queryString = `?page=${page}&limit=${limit || ''}&query=${query || ''}&status=${
    status || ''
  }`;

  const response = await apiFetch(`${baseRoute}/${queryString}`);

  return makeActionResponse(response);
}
