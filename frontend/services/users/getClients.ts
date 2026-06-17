import { API_URL } from '@/config/api';
import { MissingRequiredArgumentError } from '@/errors/MissingRequiredArgumentError';
import { apiFetch } from '../apiFetch';
import { SafeUserPage } from './types';

export async function getClients(queryParams: {
  query?: string;
  page: number;
  limit: number;
  status?: string;
}): Promise<SafeUserPage> {
  if (!queryParams) {
    throw new MissingRequiredArgumentError(getClients.name, 'queryParams');
  }

  const { page, limit, query, status } = queryParams;

  const baseRoute = `${API_URL}/clients`;

  const queryString = `?page=${page}&limit=${limit || ''}&query=${query || ''}&status=${
    status || ''
  }`;

  const response = await apiFetch(`${baseRoute}/${queryString}`);

  const json = await response.json();

  return json.data;
}
