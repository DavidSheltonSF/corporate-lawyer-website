import { User } from '@/types/User';
import { WithId } from '@/types/WithId';
import { createContext, Dispatch, SetStateAction } from 'react';

export type UserDataContextType = {
  userData: WithId<User>;
};

export const UserDataContext = createContext<UserDataContextType | undefined>(undefined);
