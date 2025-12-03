import { CasesPaginationProps } from '@/types/CasesPaginationProps';

export async function getClientCases(
  clientId: string,
  page: number,
  limit: number
): Promise<CasesPaginationProps> {
  try {
    const response = await fetch(`/api/cases/${clientId}?page=${page}&limit=${limit}`);

    const clientCases = await response.json();

    return clientCases;
  } catch (error) {
    console.log(error);
    throw new Error('Something went wrong');
  }
}
