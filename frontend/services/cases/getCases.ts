import { API_URL } from '@/config/api';
import { apiFetch } from '../apiFetch';
import { makeActionResponse } from '@/factories/makeActionResponse';
import { GetCasesParams, GetCasesResponse } from './types';

export async function getCases(params: GetCasesParams): Promise<GetCasesResponse> {
  const { page, limit, search, status, populate } = params;

  const baseRoute = `${API_URL}/cases`;

  const queryString = `?page=${page}&limit=${limit || ''}&query=${search || ''}&status=${
    status || ''
  }&populate=${populate || ''}`;

  const response = await apiFetch(`${baseRoute}/${queryString}`, {
    method: 'GET',
  });

  return makeActionResponse(response);
}
