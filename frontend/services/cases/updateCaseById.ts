import { API_URL } from '@/config/api';
import { apiFetch } from '../apiFetch';

interface UpdateCaseParams {
  caseId: string;
  data: Record<string, string>;
}

export async function updateCaseById({ caseId, data }: UpdateCaseParams): Promise<void> {
  const { title, description, processNumber, court, courtDivision, status, state, city } = data;

  await apiFetch(`${API_URL}/cases/${caseId}`, {
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
