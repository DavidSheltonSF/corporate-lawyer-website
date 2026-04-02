import { API_URL } from '@/config/api';
import { getTokenFromCookies } from '@/lib/getTokenFromCookies';
import { Case } from '@/types/Case';
import { WithId } from '@/types/WithId';
import { mapLabelToCaseStatus } from '@/mapper/mapLabelToCaseStatus';
import { apiFetch } from '../apiFetch';

export async function updateCaseById(id: string, formData: FormData): Promise<WithId<Case>> {
  const title = formData.get('title');
  const description = formData.get('description');
  const processNumber = formData.get('processNumber');
  const court = formData.get('court');
  const courtDivision = formData.get('courtDivision');
  const status = formData.get('status');
  const mappedStatus = mapLabelToCaseStatus(status?.toString() || '');

  const token = await getTokenFromCookies();
  const response = await apiFetch(`${API_URL}/cases/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    method: 'PUT',
    body: JSON.stringify({
      title,
      description,
      processNumber,
      court,
      courtDivision,
      status: mappedStatus,
    }),
  });

  const json = await response.json();

  return json.data;
}
