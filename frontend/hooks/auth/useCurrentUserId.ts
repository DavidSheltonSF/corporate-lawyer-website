import { useCurrentUser } from './useCurrentUser';

export function useCurrentUserId() {
  const user = useCurrentUser();
  return user.id;
}
