import { API_URL } from '@/config/api';

export async function authenticateUser(formData: FormData): Promise<string | null> {
  const email = formData.get('email');
  const password = formData.get('password');

  const response = await fetch(`${API_URL}/auth`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.status === 401 || response.status === 400) {
    return null;
  }

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message);
  }

  const json = await response.json();

  return json.token;
}
