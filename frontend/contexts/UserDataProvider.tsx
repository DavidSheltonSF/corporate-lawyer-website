'use client';

import { ReactNode } from 'react';
import { UserDataContext } from './UserDataContext';
import { User } from '@/types/User';
import { WithId } from '@/types/WithId';

interface Props {
  userData: WithId<User>;
  children: ReactNode;
}

export function UserDataProvider({ userData, children }: Props) {
  return <UserDataContext.Provider value={{ userData }}>{children}</UserDataContext.Provider>;
}
