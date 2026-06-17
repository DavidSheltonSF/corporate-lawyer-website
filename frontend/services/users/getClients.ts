import { API_URL } from '@/config/api';
import { apiFetch } from '../apiFetch';
import { GetUsersParams, SafeUserPage } from './types';

export async function getClients({ search, limit, page }: GetUsersParams): Promise<SafeUserPage> {
  const baseRoute = `${API_URL}/clients`;

  const queryString = new URLSearchParams({
    search: search ?? '',
    limit: String(limit) ?? '',
    page: String(page) ?? '',
  });

  const response = await apiFetch(`${baseRoute}/${queryString}`);

  const json = await response.json();

  return json.data;
}
