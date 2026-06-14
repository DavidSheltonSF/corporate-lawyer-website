import { API_URL } from '@/config/api';
import { apiFetch } from '../apiFetch';
import { GetCasesParams } from './types';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { WithId } from '@/types/WithId';
import { Page } from '@/types/Page';
import { UserRole } from '@/types/UserRole';

export async function getCases(
  userRole: string,
  params: GetCasesParams
): Promise<Page<WithId<CaseWithRelations[]>>> {
  const { page, limit, search, status, populate, clientId } = params;

  let baseRoute = `${API_URL}/cases`;

  if (userRole === UserRole.client) {
    baseRoute = `${API_URL}/my/cases`;
  }

  console.log('ROLE');
  console.log(userRole);

  const queryString = new URLSearchParams({
    page: String(page),
    limit: String(limit ?? ''),
    clientId: clientId ?? '',
    query: search ?? '',
    status: status ?? '',
    populate: populate?.toString() ?? '',
  });

  const response = await apiFetch(`${baseRoute}?${queryString}`, {
    method: 'GET',
  });

  const json = await response.json();
  console.log(json.data);
  return json.data;
}
