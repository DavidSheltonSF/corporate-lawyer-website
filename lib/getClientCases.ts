import { CaseQueryTypeEnum } from '@/components/CaseQueryTypeEnum';
import { CasesPaginationProps } from '@/types/CasesPaginationProps';

export async function getClientCases(
  clientId: string,
  page: number,
  limit: number,
  additionalQuery?: {
    value: string;
    type: CaseQueryTypeEnum;
  }
): Promise<CasesPaginationProps> {
  try {
    let baseRoute = '/api/cases/';
    let queryString = `${clientId}?page=${page}&limit=${limit}`;

    switch (additionalQuery?.type) {
      case CaseQueryTypeEnum.num_processo:
        queryString += `&processNumber=${additionalQuery.value}`;
        break;
      case CaseQueryTypeEnum.titulo:
        queryString += `&title=${additionalQuery.value}`;

      default:
        break;
    }

    const response = await fetch(`${baseRoute}/${queryString}`);

    const clientCases = await response.json();

    return clientCases;
  } catch (error) {
    console.log(error);
    throw new Error('Something went wrong');
  }
}
