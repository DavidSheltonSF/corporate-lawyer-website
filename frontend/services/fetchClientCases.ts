import { API_URL } from '@/config/api';
import { MissingRequiredArgumentError } from '@/errors/MissingRequiredArgumentError';
import { CasesPagination } from '@/types/CasesPagination';

export async function fetchClientCases(
  clientId: string,
  queryParams: {
    query?: string;
    page: number;
    limit: number;
    status?: string;
  },
  populate?: string[]
): Promise<CasesPagination> {
  try {
    if (!clientId) {
      throw new MissingRequiredArgumentError(fetchClientCases.name, 'clientId');
    }

    if (!queryParams) {
      throw new MissingRequiredArgumentError(fetchClientCases.name, 'queryParams');
    }

    const { page, limit, query, status } = queryParams;

    const baseRoute = `${API_URL}/client/${clientId}/cases`;
    console.log(queryParams);

    const queryString = `?page=${page}&limit=${limit || ''}&query=${query || ''}&status=${
      status || ''
    }&populate=${populate || ''}`;

    const response = await fetch(`${baseRoute}/${queryString}`);

    if (!response.ok) {
      throw Error(await response.text());
    }

    const responseJson = await response.json();

    return responseJson.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}
