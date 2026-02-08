import { UserDataContext, UserDataContextType } from '@/contexts/UserDataContext';
import { useContext } from 'react';

export const useUserContext = (): UserDataContextType | undefined => useContext(UserDataContext);
