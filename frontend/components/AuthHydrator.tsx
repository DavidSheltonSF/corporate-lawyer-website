'use client';
import { useAuthStore } from '@/stores/useAuthStore';
import { User } from '@/types/User';
import { WithId } from '@/types/WithId';
import { PropsWithChildren, useEffect } from 'react';

interface Props {
  user: WithId<User>;
}

export function AuthHydrator({ user, children }: PropsWithChildren<Props>) {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return <>{children}</>;
}
