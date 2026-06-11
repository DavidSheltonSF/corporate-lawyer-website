import { User } from '@/types/User';
import { WithId } from '@/types/WithId';
import { create } from 'zustand';

interface AuthStore {
  user: WithId<User> | null;
  setUser: (user: WithId<User>) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,

  setUser: (user: WithId<User> | null) => {
    set({
      user,
    });
  },
}));
