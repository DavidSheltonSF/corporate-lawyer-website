import { API_URL } from '@/config/api';
import { MissingRequiredArgumentError } from '@/errors/MissingRequiredArgumentError';
import { getTokenFromCookies } from '@/lib/getTokenFromCookies';
import { CaseWithLawyers } from '@/types/CaseWithLawyers';
import { Page } from '@/types/Page';
import { WithId } from '@/types/WithId';

export async function getMyCases(
  queryParams: {
    query?: string;
    page: number;
    limit: number;
    status?: string;
  },
  populate?: string[]
): Promise<Page<WithId<CaseWithLawyers>>> {
  try {
    if (!queryParams) {
      throw new MissingRequiredArgumentError(getMyCases.name, 'queryParams');
    }

    const { page, limit, query, status } = queryParams;

    const baseRoute = `${API_URL}/client/cases`;
    console.log(queryParams);

    const queryString = `?page=${page}&limit=${limit || ''}&query=${query || ''}&status=${
      status || ''
    }&populate=${populate || ''}`;

    const token = await getTokenFromCookies();

    const response = await fetch(`${baseRoute}/${queryString}`, {
      headers: {
        Authorization: token,
      },
    });

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
