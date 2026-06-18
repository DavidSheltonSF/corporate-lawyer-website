import { useCurrentUser } from './useCurrentUser';

export function useUserRole(): string {
  const user = useCurrentUser();
  return user.role;
}
