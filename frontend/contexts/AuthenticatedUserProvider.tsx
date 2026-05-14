'use client';

import { ReactNode } from 'react';
import { AuthenticatedUserContext } from './AuthenticatedUserContext';
import { User } from '@/types/User';
import { WithId } from '@/types/WithId';

interface Props {
  children: ReactNode;
  userData: WithId<User | null>;
}

export function AuthenticatedUserProvider({ userData, children }: Props) {
  return (
    <AuthenticatedUserContext.Provider value={{ userData }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
}
