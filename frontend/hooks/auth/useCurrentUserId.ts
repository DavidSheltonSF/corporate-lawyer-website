import { useCurrentUser } from './useCurrentUser';

export function useCurrentUserId() {
  const user = useCurrentUser();
  if (!user) {
    return null;
  }
  return user.id;
}
