'use client';
import { PropsWithChildren } from 'react';
import { AuthContext } from './AuthContext';
import { WithId } from '@/types/WithId';
import { User } from '@/types/User';

interface Props {
  user: WithId<User>;
}
export function AuthContextProvider({ user, children }: PropsWithChildren<Props>) {
  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}
