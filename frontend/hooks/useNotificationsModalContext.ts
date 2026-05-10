import { NotificationsModalContext } from '@/contexts/modals/NotificationsModalContext';
import { MissingContextError } from '@/errors/MissingContextError';
import { useContext } from 'react';

export const useNotificationsModalContext = (): NotificationsModalContext => {
  const context = useContext(NotificationsModalContext);
  if (!context) {
    throw new MissingContextError(NotificationsModalContext.name);
  }
  return context;
};
