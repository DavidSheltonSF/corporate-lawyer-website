import { API_URL } from '@/config/api';

export async function authenticateUser(formData: FormData): Promise<string | null> {
  const email = formData.get('email');
  const password = formData.get('password');

  const response = await fetch(`${API_URL}/api/auth`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  console.log(data);

  if (!data || data.status > 300) {
    console.log(data.message);
    return null;
  }

  return data.token;
}
