import { API_URL } from '@/config/api';
import { SafeUser } from '@/types/SafeUser';
import { WithId } from '@/types/WithId';
import { apiFetch } from '../apiFetch';

export async function updateUser(id: string, formData: FormData): Promise<WithId<SafeUser>> {
  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const email = formData.get('email');
  const cpf = formData.get('cpf');

  const response = await apiFetch(`${API_URL}/users/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
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
