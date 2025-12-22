import { API_URL } from '@/config/api';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { WithId } from '@/types/WithId';
import { notFound } from 'next/navigation';

export async function fetchCaseById(
  id: string,
  populateFields?: string[]
): Promise<WithId<CaseWithRelations>> {
  const response = await fetch(
    `${API_URL}/cases/507f1f77bcf86cd799439011
?populate=${populateFields ? populateFields?.join(',') : ''}`
  );

  if(response.status === 404) {
    return notFound()
  }

  if (!response.ok) {
    const message = await response.text();
    throw Error(message);
  }

  const json = await response.json();
  return json.data;
}
