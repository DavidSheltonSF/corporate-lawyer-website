import { User } from '@/types/User';
import { WithId } from '@/types/WithId';
import { createContext } from 'react';

export type AuthenticatedUserContextType = {
  userData: WithId<User>;
};

export const AuthenticatedUserContext = createContext<AuthenticatedUserContextType | undefined>(
  undefined
);
