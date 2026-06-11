import { API_URL } from '@/config/api';
import { apiFetch } from '../apiFetch';
import { makeActionResponse } from '@/factories/makeActionResponse';
import { GetCasesParams, GetCasesResponse } from './types';

export async function getMyCases(params: GetCasesParams): Promise<GetCasesResponse> {
  const { page, limit, search, status, populate } = params;

  const baseRoute = `${API_URL}/my/cases`;

  const queryString = `?page=${page}&limit=${limit || ''}&query=${search || ''}&status=${
    status || ''
  }&populate=${populate || ''}`;

  const response = await apiFetch(`${baseRoute}/${queryString}`);
  return makeActionResponse(response);
}
