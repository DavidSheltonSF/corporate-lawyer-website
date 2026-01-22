import { ServerError } from '@/errors/ServerError';
import { getTokenFromCookies } from '@/lib/getTokenFromCookies';

export async function fetchUploadCaseFile(formData: FormData, id: string) {
  const token = await getTokenFromCookies();
  const response = await fetch(`/api/client/cases/${id}/caseFiles`, {
    headers: {
      Authorization: token,
    },
    method: 'POST',
    body: formData,
  });

  if (response.status === 500) {
    throw new ServerError();
  }

  if (!response.ok) {
    throw Error(await response.text());
  }
}
