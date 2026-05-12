import { SelectedClientContext } from '@/contexts/clients/SelectedClientContext';
import { MissingContextError } from '@/errors/MissingContextError';
import { useContext } from 'react';

export const useSelectedClientContext = (): SelectedClientContext => {
  const context = useContext(SelectedClientContext);

  if (!context) {
    throw new MissingContextError(SelectedClientContext.name);
  }

  return context;
};
