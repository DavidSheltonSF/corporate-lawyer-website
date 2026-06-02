import { API_URL } from '@/config/api';
import { Case } from '@/types/Case';
import { WithId } from '@/types/WithId';
import { apiFetch } from '../apiFetch';
import { mapLabelToCaseStatus } from '@/mapper/mapLabelToCaseStatus';
import { mapLabelToBrazilState } from '@/mapper/mapLabelToBrazilState';
import { mapLabelToCity } from '@/mapper/mapLabelToCity';
import { ActionResponse } from '@/types/ActionResponse';
import { makeActionResponse } from '@/factories/makeActionResponse';

export async function createCase<T>(
  clientId: string,
  lawyerId: string,
  formData: Record<string, string>
): Promise<ActionResponse<WithId<Case>>> {
  const title = formData.title;
  const description = formData.description;
  const processNumber = formData.processNumber;
  const court = formData.court;
  const courtDivision = formData.courtDivision;
  const status = formData.status;
  const state = formData.state;
  const city = formData.city;
  const mappedStatus = mapLabelToCaseStatus(status?.toString() || '');
  const mappedState = mapLabelToBrazilState(state?.toString() || '');
  const mappedCity = mapLabelToCity(city?.toString() || '');

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
      location: {
        state: mappedState,
        city: mappedCity,
      },
    }),
  });
  return makeActionResponse(response);
}
