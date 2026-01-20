import { ServerError } from '@/errors/ServerError';

export async function fetchUploadCaseDocument(formData: FormData) {
  const response = await fetch('/api/caseDocuments/upload', {
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
