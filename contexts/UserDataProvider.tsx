'use client';

import { ReactNode } from 'react';
import { UserDataContext } from './UserDataContext';
import { UserProps } from '@/types/UserProps';
import { WithId } from '@/types/WithId';

interface Props {
  userData: WithId<UserProps>;
  children: ReactNode;
}

export function UserDataProvider({ userData, children }: Props) {
  return <UserDataContext.Provider value={{ userData }}>{children}</UserDataContext.Provider>;
}
