import { API_URL } from '@/config/api';
import { SafeUser } from '@/types/SafeUser';
import { WithId } from '@/types/WithId';
import { apiFetch } from '../apiFetch';
import { ActionResponse } from '@/types/ActionResponse';
import { makeActionResponse } from '@/factories/makeActionResponse';

interface UpdateUserParams {
  userId: string;
  data: Record<string, string>;
}

export async function updateUser({
  userId,
  data,
}: UpdateUserParams): Promise<ActionResponse<WithId<SafeUser>>> {
  const firstName = data.firstName;
  const lastName = data.lastName;
  const email = data.email;
  const cpf = data.cpf;
  const phone = data.phone;

  const response = await apiFetch(`${API_URL}/users/${userId}`, {
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
