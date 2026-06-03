import { API_URL } from '@/config/api';
import { SafeUser } from '@/types/SafeUser';
import { WithId } from '@/types/WithId';
import { apiFetch } from '../apiFetch';
import { ActionResponse } from '@/types/ActionResponse';
import { makeActionResponse } from '@/factories/makeActionResponse';

export async function updateUser(
  id: string,
  formData: Record<string, string>
): Promise<ActionResponse<WithId<SafeUser>>> {
  const firstName = formData.firstName;
  const lastName = formData.lastName;
  const email = formData.email;
  const cpf = formData.cpf;
  const phone = formData.phone;

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
