import { API_URL } from '@/config/api';
import { apiFetch } from '../apiFetch';
import { ActionResponse } from '@/types/ActionResponse';

export async function authenticateUser(formData: FormData): Promise<ActionResponse> {
  const email = formData.get('email');
  const password = formData.get('password');

  const response = await apiFetch(`${API_URL}/auth`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  const json = await response.json();

  if (!response.ok) {
    return { success: false, message: json.message };
  }

  return { success: true, data: json.data };
}
