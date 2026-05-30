import { ActionResponse } from '@/types/ActionResponse';
import { apiFetch } from '../apiFetch';
import { makeEmptyActionResponse } from '@/factories/makeEmptyActionResponse';

export async function uploadCaseFile(
  formData: FormData,
  id: string
): Promise<ActionResponse<null>> {
  const response = await apiFetch(`/api/my/cases/${id}/files`, {
    method: 'POST',
    body: formData,
  });

  return makeEmptyActionResponse(response);
}
