import { API_URL } from '@/config/api';
import { SafeUser } from '@/types/SafeUser';
import { WithId } from '@/types/WithId';
import { apiFetch } from '../apiFetch';
import { ActionResponse } from '@/types/ActionResponse';
import { makeActionResponse } from '@/factories/makeActionResponse';

export async function updateUser(
  id: string,
  formData: FormData
): Promise<ActionResponse<WithId<SafeUser>>> {
  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const email = formData.get('email');
  const cpf = formData.get('cpf');
  const phone = formData.get('phone');

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
      phone,
    }),
  });

  return makeActionResponse(response);
}
