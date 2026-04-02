import { getTokenFromCookies } from '@/lib/getTokenFromCookies';
import { handleLogout } from '@/lib/handleLogout';

interface RequestInit {
  headers?: {
    'Content-Type'?: string;
    Authorization?: string;
  };
  method?: 'PUT' | 'POST' | 'GET' | 'DELETE';
}

export async function apiFetch(url: string, options: RequestInit): Promise<Response> {
  const token = await getTokenFromCookies();

  const response = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: token,
    },
  });

  if (response.status === 401) {
    handleLogout();
    throw Error('Unouthorized');
  }

  if(!response.ok){
    const json = await response.json();
    throw Error(json.message)
  }

  return response;
}
