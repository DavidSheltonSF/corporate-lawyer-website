import { API_URL } from '@/config/api';
import { User } from '@/types/User';
import { WithId } from '@/types/WithId';
import { apiFetch } from '../apiFetch';

export async function createClient(formData: FormData): Promise<WithId<User>> {
  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const email = formData.get('email');
  const cpf = formData.get('cpf');

  const response = await apiFetch(`${API_URL}/clients`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      cpf,
    }),
  });

  const json = await response.json();

  return json.data;
}
