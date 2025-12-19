import { API_URL } from '@/config/api';
import { MissingRequiredArgumentError } from '@/errors/MissingRequiredArgumentError';
import { CasesPaginationProps } from '@/types/CasesPaginationProps';

export async function fetchClientCases(
  clientId: string,
  queryParams: {
    page: number;
    limit: number;
    title?: string;
    processNumber?: string;
    status?: string;
  }
): Promise<CasesPaginationProps> {
  try {
    if(!clientId){
      throw new MissingRequiredArgumentError(fetchClientCases.name, 'clientId');
    }

    if(!queryParams){
      throw new MissingRequiredArgumentError(fetchClientCases.name, 'queryParams');
    }

    const { page, limit, processNumber, title, status } = queryParams;

    let baseRoute = `${API_URL}/client/${clientId}/cases`;

    let queryString = `?page=${page}&limit=${limit || ''}&processNumber=${
      processNumber || ''
    }&title=${title || ''}&status=${status || ''}`;

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
