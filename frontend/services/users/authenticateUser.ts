import { API_URL } from '@/config/api';
import { apiFetch } from '../apiFetch';
import { ActionResponse } from '@/types/ActionResponse';
import { makeActionResponse } from '@/factories/makeActionResponse';

export async function authenticateUser(formData: FormData): Promise<ActionResponse<string>> {
  const email = formData.get('email');
  const password = formData.get('password');

  const response = await apiFetch(`${API_URL}/auth`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  return makeActionResponse(response);
}
