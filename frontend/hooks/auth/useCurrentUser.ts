import { AuthContext } from '@/contexts/auth/AuthContext';
import { MissingContextError } from '@/errors/MissingContextError';
import { User } from '@/types/User';
import { WithId } from '@/types/WithId';
import { useContext } from 'react';

export function useCurrentUser(): WithId<User> {
  const context = useContext(AuthContext);
  if (!context) {
    throw new MissingContextError(AuthContext.name);
  }

  return context.user;
}
