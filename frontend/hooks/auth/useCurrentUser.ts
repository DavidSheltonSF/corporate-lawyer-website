import { useAuthStore } from '@/stores/useAuthStore';
import { User } from '@/types/User';
import { WithId } from '@/types/WithId';

export function useCurrentUser(): WithId<User> {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    throw Error('User not authenticated');
  }

  return user;
}
