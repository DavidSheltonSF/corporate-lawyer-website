import { API_URL } from '@/config/api';
import { ServerError } from '@/errors/ServerError';
import { getTokenFromCookies } from '@/lib/getTokenFromCookies';
import { Case } from '@/types/Case';
import { WithId } from '@/types/WithId';

export async function createCase(
  clientId: string,
  lawyerId: string,
  formData: FormData
): Promise<WithId<Case>> {
  const title = formData.get('title');
  const description = formData.get('description');
  const processNumber = formData.get('processNumber');
  const court = formData.get('court');
  const courtDivision = formData.get('courtDivision');
  const status = formData.get('status');

  console.log({
    client: clientId,
    lawyers: [lawyerId],
    title,
    description,
    processNumber,
    court,
    courtDivision,
    status,
  });

  const token = await getTokenFromCookies();
  const response = await fetch(`${API_URL}/cases`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    method: 'POST',
    body: JSON.stringify({
      client: clientId,
      lawyers: [lawyerId],
      title,
      description,
      processNumber,
      court,
      courtDivision,
      status,
    }),
  });

  if (response.status === 500) {
    throw new ServerError();
  }

  if (!response.ok) {
    const json = await response.json();
    throw Error(json.message);
  }

  const json = await response.json();

  return json.data;
}
