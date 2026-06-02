import { User } from '@/types/User';
import { WithId } from '@/types/WithId';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  user: WithId<User> | null;
  setUser: (user: WithId<User>) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,

      setUser: (user: WithId<User> | null) => {
        set({
          user,
        });
      },
    }),
    { name: 'auth-storage' }
  )
);
