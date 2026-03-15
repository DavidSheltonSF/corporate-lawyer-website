'use client';

import { ReactNode } from 'react';
import { AuthenticatedUserContext } from './AuthenticatedUserContext';
import { User } from '@/types/User';
import { WithId } from '@/types/WithId';

interface Props {
  userData: WithId<User>;
  children: ReactNode;
}

export function AuthenticatedUserProvider({ userData, children }: Props) {
  return (
    <AuthenticatedUserContext.Provider value={{ userData }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
}
