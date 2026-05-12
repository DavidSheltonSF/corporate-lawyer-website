import { SelectedCaseContext } from '@/contexts/cases/SelectedCaseContext';
import { MissingContextError } from '@/errors/MissingContextError';
import { useContext } from 'react';

export const useSelectedCaseContext = (): SelectedCaseContext => {
  const context = useContext(SelectedCaseContext);

  if (!context) {
    throw new MissingContextError(SelectedCaseContext.name);
  }

  return context;
};
