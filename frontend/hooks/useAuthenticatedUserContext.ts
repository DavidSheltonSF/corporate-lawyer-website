import {
  AuthenticatedUserContext,
  AuthenticatedUserContextType,
} from '@/contexts/AuthenticatedUserContext';
import { MissingContextError } from '@/errors/MissingContextError';
import { useContext } from 'react';

export const useAuthenticatedUserContext = (): AuthenticatedUserContextType => {
  const context = useContext(AuthenticatedUserContext);
  if (!context) {
    throw new MissingContextError(AuthenticatedUserContext.name);
  }
  return context;
};
