import { ActionResponse } from '@/types/ActionResponse';
import { apiFetch } from '../apiFetch';
import { makeEmptyActionResponse } from '@/factories/makeEmptyActionResponse';

interface UploadFileParam {
  formData: FormData;
  ownerId: string;
}

export async function uploadCaseFile({
  formData,
  ownerId,
}: UploadFileParam): Promise<ActionResponse<null>> {
  const response = await apiFetch(`/api/my/cases/${ownerId}/files`, {
    method: 'POST',
    body: formData,
  });

  return makeEmptyActionResponse(response);
}
