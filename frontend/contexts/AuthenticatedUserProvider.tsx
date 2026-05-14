'use client';

import { ReactNode, useState } from 'react';
import { AuthenticatedUserContext } from './AuthenticatedUserContext';
import { User } from '@/types/User';
import { WithId } from '@/types/WithId';

interface Props {
  children: ReactNode;
}

export function AuthenticatedUserProvider({ children }: Props) {
  const [userData, setUserData] = useState<WithId<User> | null>(null)
  return (
    <AuthenticatedUserContext.Provider value={{ userData, setUserData }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
}
