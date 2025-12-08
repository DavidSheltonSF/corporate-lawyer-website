import { API_URL } from '@/config/api';

export async function authenticateUser(formData: FormData): Promise<string | null> {
  try {
    const email = formData.get('email');
    const password = formData.get('password');

    const response = await fetch(`${API_URL}/auth`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const message = await response.text();
      throw Error(message)
    }
      
    const data = await response.json();
    return data.token;
    
  } catch (error) {
    console.log(error)
    throw Error('Something went wrongg')
  }
}
