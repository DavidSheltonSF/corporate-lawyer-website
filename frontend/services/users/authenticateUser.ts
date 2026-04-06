import { API_URL } from '@/config/api';
import { apiFetch } from '../apiFetch';

export async function authenticateUser(formData: FormData): Promise<string> {
  console.log('authenticateUser');
  const email = formData.get('email');
  const password = formData.get('password');

  const response = await apiFetch(`${API_URL}/auth`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  const json = await response.json();

  return json.data;
}
