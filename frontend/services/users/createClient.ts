import { API_URL } from '@/config/api';
import { User } from '@/types/User';
import { WithId } from '@/types/WithId';
import { apiFetch } from '../apiFetch';
import { makeActionResponse } from '@/factories/makeActionResponse';
import { ActionResponse } from '@/types/ActionResponse';

export async function createClient(formData: Record<string, string>): Promise<ActionResponse<WithId<User>>> {
  const firstName = formData.firstName;
  const lastName = formData.lastName;
  const email = formData.email;
  const cpf = formData.cpf;

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

  return makeActionResponse(response);
}
