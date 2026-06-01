import { API_URL } from '@/config/api';
import { Case } from '@/types/Case';
import { WithId } from '@/types/WithId';
import { apiFetch } from '../apiFetch';
import { ActionResponse } from '@/types/ActionResponse';
import { makeActionResponse } from '@/factories/makeActionResponse';

export async function updateCaseById(
  id: string,
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
      status,
      location: {
        state,
        city,
      },
    }),
  });

  return makeActionResponse(response);
}
