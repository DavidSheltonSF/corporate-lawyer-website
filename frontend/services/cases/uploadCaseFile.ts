import { apiFetch } from '../apiFetch';

export async function uploadCaseFile(formData: FormData, id: string) {
  await apiFetch(`/api/my/cases/${id}/caseFiles`, {
    method: 'POST',
    body: formData,
  });
}
