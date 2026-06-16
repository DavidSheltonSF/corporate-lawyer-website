import { API_URL } from '@/config/api';
import { apiFetch } from '../apiFetch';

interface UpdateCaseParams {
  id: string;
  formData: Record<string, string>;
}

export async function updateCaseById({ id, formData }: UpdateCaseParams): Promise<void> {
  const title = formData.title;
  const description = formData.description;
  const processNumber = formData.processNumber;
  const court = formData.court;
  const courtDivision = formData.courtDivision;
  const status = formData.status;
  const state = formData.state;
  const city = formData.city;

  await apiFetch(`${API_URL}/cases/${id}`, {
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
}
