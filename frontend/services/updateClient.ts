import { API_URL } from '@/config/api';
import { ServerError } from '@/errors/ServerError';
import { getTokenFromCookies } from '@/lib/getTokenFromCookies';
import { SafeUser } from '@/types/SafeUser';
import { WithId } from '@/types/WithId';

export async function updateClient(id: string, formData: FormData): Promise<WithId<SafeUser>> {
  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const email = formData.get('email');
  const cpf = formData.get('cpf');

  const token = await getTokenFromCookies();
  const response = await fetch(`${API_URL}/clients/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    method: 'PUT',
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      cpf,
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
