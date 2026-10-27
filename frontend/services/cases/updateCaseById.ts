import { API_URL } from '@/config/api';
import { makeActionResponse } from '@/factories/makeActionResponse';
import { apiFetch } from '../apiFetch';

interface UpdateCaseParams {
  caseId: string;
  data: Record<string, string>;
}

export async function updateCaseById({ caseId, data }: UpdateCaseParams): Promise<void> {
  const { title, description, caseNumber, court, courtDivision, status, state, city } = data;

  const response = await apiFetch(`${API_URL}/cases/${caseId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify({
      title,
      description,
      caseNumber,
      court,
      courtDivision,
      status,
      location: {
        state,
        city,
      },
    }),
  });

  if (!response.ok) {
    const errorResponse = await makeActionResponse<never>(response);
    if ('message' in errorResponse) {
      throw new Error(errorResponse.message);
    }
    throw new Error('Unexpected error while updating case');
  }
}
