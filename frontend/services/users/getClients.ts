import { API_URL } from '@/config/api';
import { MissingRequiredArgumentError } from '@/errors/MissingRequiredArgumentError';
import { Page } from '@/types/Page';
import { SafeUser } from '@/types/SafeUser';
import { WithId } from '@/types/WithId';
import { apiFetch } from '../apiFetch';

export async function getClients(queryParams: {
  query?: string;
  page: number;
  limit: number;
  status?: string;
}): Promise<Page<WithId<SafeUser>>> {
  try {
    if (!queryParams) {
      throw new MissingRequiredArgumentError(getClients.name, 'queryParams');
    }

    const { page, limit, query, status } = queryParams;

    const baseRoute = `${API_URL}/clients`;

    const queryString = `?page=${page}&limit=${limit || ''}&query=${query || ''}&status=${
      status || ''
    }`;

    const response = await apiFetch(`${baseRoute}/${queryString}`);

    const responseJson = await response.json();

    return responseJson.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}
