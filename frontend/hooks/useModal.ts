import { ModalContext } from '@/contexts/modals/ModalContext';
import { MissingContextError } from '@/errors/MissingContextError';
import { useContext } from 'react';

export function useModal(): ModalContext {
  const context = useContext(ModalContext);
  if (!context) {
    throw new MissingContextError(ModalContext.name);
  }
  return context;
}
