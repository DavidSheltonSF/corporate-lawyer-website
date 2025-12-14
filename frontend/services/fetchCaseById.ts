import { API_URL } from '@/config/api';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { WithId } from '@/types/WithId';

export async function fetchCaseById(
  id: string,
  include?: string[]
): Promise<WithId<CaseWithRelations>> {
  const response = await fetch(
    `${API_URL}/cases/${id}?include=${include ? include?.join(',') : ''}`
  );

  if (!response.ok) {
    const message = await response.text();
    throw Error(message);
  }

  const json = await response.json();
  return json.data;
}
