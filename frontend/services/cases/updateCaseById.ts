import { API_URL } from '@/config/api';
import { Case } from '@/types/Case';
import { WithId } from '@/types/WithId';
import { mapLabelToCaseStatus } from '@/mapper/mapLabelToCaseStatus';
import { apiFetch } from '../apiFetch';
import { mapLabelToBrazilState } from '@/mapper/mapLabelToBrazilState';
import { mapLabelToCity } from '@/mapper/mapLabelToCity';

export async function updateCaseById(id: string, formData: FormData): Promise<WithId<Case>> {
  const title = formData.get('title');
  const description = formData.get('description');
  const processNumber = formData.get('processNumber');
  const court = formData.get('court');
  const courtDivision = formData.get('courtDivision');
  const status = formData.get('status');
  const state = formData.get('state');
  const city = formData.get('city');

  const mappedStatus = mapLabelToCaseStatus(status?.toString() || '');
  const mappedState = mapLabelToBrazilState(state?.toString() || '');
  const mappedCity = mapLabelToCity(city?.toString() || '');

  const response = await apiFetch(`${API_URL}/cases/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify({
      title,
      description,
      processNumber,
      court,
      courtDivision,
      status: mappedStatus,
      location: {
        state: mappedState,
        city: mappedCity,
      },
    }),
  });

  const json = await response.json();

  return json.data;
}
