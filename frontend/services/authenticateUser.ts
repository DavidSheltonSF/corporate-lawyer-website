import { API_URL } from '@/config/api';

export async function authenticateUser(formData: FormData): Promise<string> {
  const email = formData.get('email');
  const password = formData.get('password');

  const response = await fetch(`${API_URL}/auth`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data.token;
}
