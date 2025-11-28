import { UserProps } from '@/types/UserProps';

export async function getUserInformation(token: string): Promise<UserProps | null> {
  const response = await fetch('http://localhost:3001/api/me', {
    headers: {
      Authorization: token,
    },
  });

  const data = await response.json();

  if (data.status > 300) {
    return null;
  }

  return data.user;
}
