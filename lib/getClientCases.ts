import { CaseProps } from '@/types/CaseProps';
import { WithId } from '@/types/WIthId';

export async function getClientCases(clientId: string): Promise<WithId<CaseProps>[]> {
  try {
    const response = await fetch(`/api/cases/${clientId}`);

    const clientCases = await response.json();

    return clientCases;
  } catch (error) {
    console.log(error);
    throw new Error('Something went wrong');
  }
}
