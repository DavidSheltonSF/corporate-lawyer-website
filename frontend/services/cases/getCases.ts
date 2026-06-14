import { API_URL } from '@/config/api';
import { apiFetch } from '../apiFetch';
import { GetCasesParams } from './types';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { WithId } from '@/types/WithId';
import { Page } from '@/types/Page';

export async function getCases(params: GetCasesParams): Promise<Page<WithId<CaseWithRelations[]>>> {
  const { page, limit, search, status, populate, clientId } = params;

  const baseRoute = `${API_URL}/cases`;

  const queryString = `?page=${page}&limit=${limit || ''}&clientId=${clientId}&query=${search || ''}&status=${
    status || ''
  }&populate=${populate || ''}`;

  const response = await apiFetch(`${baseRoute}/${queryString}`, {
    method: 'GET',
  });

  const json = await response.json();
  return json.data;
}
