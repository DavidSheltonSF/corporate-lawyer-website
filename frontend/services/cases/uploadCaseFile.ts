import { getTokenFromCookies } from '@/lib/getTokenFromCookies';
import { apiFetch } from '../apiFetch';

export async function uploadCaseFile(formData: FormData, id: string) {
  const token = await getTokenFromCookies();
  await apiFetch(`/api/my/cases/${id}/caseFiles`, {
    headers: {
      Authorization: token,
    },
    method: 'POST',
    body: formData,
  });
}
