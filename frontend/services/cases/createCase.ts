import { API_URL } from '@/config/api';
import { Case } from '@/types/Case';
import { WithId } from '@/types/WithId';
import { apiFetch } from '../apiFetch';
import { mapLabelToCaseStatus } from '@/mapper/mapLabelToCaseStatus';

export async function createCase(
  clientId: string,
  lawyerId: string,
  formData: FormData
): Promise<WithId<Case>> {
  const title = formData.get('title');
  const description = formData.get('description');
  const processNumber = formData.get('processNumber');
  const court = formData.get('court');
  const courtDivision = formData.get('courtDivision');
  const status = formData.get('status');
  const mappedStatus = mapLabelToCaseStatus(status?.toString() || '');

  const response = await apiFetch(`${API_URL}/cases`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      client: clientId,
      lawyers: [lawyerId],
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
