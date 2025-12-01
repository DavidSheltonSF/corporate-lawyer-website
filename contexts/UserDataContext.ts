import { UserProps } from '@/types/UserProps';
import { WithId } from '@/types/WIthId';
import { createContext, Dispatch, SetStateAction } from 'react';

export type UserDataContextType = {
  userData: WithId<UserProps>;
};

export const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

