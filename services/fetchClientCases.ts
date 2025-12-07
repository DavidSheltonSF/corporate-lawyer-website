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
    const { page, limit, processNumber, title, status } = queryParams;
    let baseRoute = 'http://localhost:3001/api/cases/';
    let queryString = `${clientId}?page=${page}&limit=${limit || ''}&processNumber=${
      processNumber || ''
    }&title=${title || ''}&status=${status || ''}`;

    const response = await fetch(`${baseRoute}/${queryString}`);

    const responseJson = await response.json();

    return responseJson.data;
  } catch (error) {
    console.log(error);
    throw new Error('Something went wrong');
  }
}
