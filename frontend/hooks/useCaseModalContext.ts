import { CaseModalContext } from '@/contexts/modals/CaseModalContext';
import { MissingContextError } from '@/errors/MissingContextError';
import { useContext } from 'react';

export const useCaseModalContext = (): CaseModalContext => {
  const context = useContext(CaseModalContext);

  if (!context) {
    throw new MissingContextError(CaseModalContext.name);
  }

  return context;
};
