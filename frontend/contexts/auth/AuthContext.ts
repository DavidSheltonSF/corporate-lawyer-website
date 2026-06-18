import { User } from '@/types/User';
import { WithId } from '@/types/WithId';
import { createContext } from 'react';

type AuthContext = {
  user: WithId<User>;
};

export const AuthContext = createContext<AuthContext | undefined>(undefined);
