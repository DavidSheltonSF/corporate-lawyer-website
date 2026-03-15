import { UserDataContext, UserDataContextType } from '@/contexts/AuthenticatedUserContext';
import { useContext } from 'react';

export const useUserContext = (): UserDataContextType | undefined => useContext(UserDataContext);
