import { ServerError } from '@/errors/ServerError';
import { getTokenFromCookies } from '@/lib/getTokenFromCookies';
import { handleLogout } from '@/lib/handleLogout';

interface RequestInit {
  headers?: {
    'Content-Type'?: string;
    Authorization?: string;
  };
  body?: any;
  method?: 'PUT' | 'POST' | 'GET' | 'DELETE';
}

export async function apiFetch(url: string, options?: RequestInit): Promise<Response> {
  const token = await getTokenFromCookies();

  const response = await fetch(url, {
    ...options,
    headers: {
      ...(options?.headers || {}),
      Authorization: token,
    },
  });

  if (response.status === 401) {
    handleLogout();
    throw Error('Unouthorized');
  }

  if (response.status === 500) {
    throw new ServerError();
  }

  if (!response.ok) {
    const json = await response.json();
    throw Error(json.message);
  }

  return response;
}
