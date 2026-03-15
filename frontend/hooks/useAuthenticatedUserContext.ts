import { AuthenticatedUserContext, AuthenticatedUserContextType } from '@/contexts/AuthenticatedUserContext';
import { useContext } from 'react';

export const useAuthenticatedUserContext = (): AuthenticatedUserContextType | undefined =>
  useContext(AuthenticatedUserContext);
