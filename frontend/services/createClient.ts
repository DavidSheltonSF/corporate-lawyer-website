import { API_URL } from '@/config/api';
import { ServerError } from '@/errors/ServerError';
import { getTokenFromCookies } from '@/lib/getTokenFromCookies';

export async function createClient(formData: FormData) {
  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const email = formData.get('email');
  const cpf = formData.get('cpf');
  alert(formData.get('firstName'));

  const token = await getTokenFromCookies();
  const response = await fetch(`${API_URL}/clients`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    method: 'POST',
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
}
