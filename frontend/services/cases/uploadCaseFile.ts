import { apiFetch } from '../apiFetch';

export async function uploadCaseFile(formData: FormData, id: string) {
  await apiFetch(`/api/my/cases/${id}/files`, {
    method: 'POST',
    body: formData,
  });
}
