import { useAuthStore } from '@/stores/useAuthStore';
import { User } from '@/types/User';
import { WithId } from '@/types/WithId';

export function useCurrentUser(): WithId<User> | null {
  return useAuthStore((state) => state.user);
}
