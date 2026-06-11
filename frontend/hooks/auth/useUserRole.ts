import { useCurrentUser } from './useCurrentUser';

export function useUserRole(): string | null {
  const user = useCurrentUser();

  if (!user) {
    return null;
  }

  return user.role;
}
