import { ServerError } from '@/errors/ServerError';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { getTokenFromCookies } from '@/lib/getTokenFromCookies';

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
      Authorization: token || '',
    },
  });

  if (response.status === 401) {
    const json = await response.json();
    throw new UnauthorizedError(json.message);
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
