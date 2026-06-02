'use client';
import { useAuthStore } from '@/stores/useAuthStore';
import { User } from '@/types/User';
import { WithId } from '@/types/WithId';
import { PropsWithChildren, useRef } from 'react';

interface Props {
  user: WithId<User>;
}

export function AuthHydrator({ user, children }: PropsWithChildren<Props>) {
  const hydratated = useRef(false);

  const setUser = useAuthStore((state) => state.setUser);

  if (!hydratated.current) {
    setUser(user);

    hydratated.current = true;
  }

  return children;
}
