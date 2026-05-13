import { ClientModalContext } from '@/contexts/modals/ClientModalContext';
import { ModalContextType } from '@/contexts/modals/ModalContextType';
import { MissingContextError } from '@/errors/MissingContextError';
import { useContext } from 'react';

export const useClientModalContext = (): ModalContextType => {
  const context = useContext(ClientModalContext);

  if (!context) {
    throw new MissingContextError(ClientModalContext.name);
  }

  return context;
};
