import { CaseModalContext } from '@/contexts/modals/CaseModalContext';
import { ModalContextType } from '@/contexts/modals/ModalContextType';
import { MissingContextError } from '@/errors/MissingContextError';
import { useContext } from 'react';

export const useCaseModalContext = (): ModalContextType => {
  const context = useContext(CaseModalContext);

  if (!context) {
    throw new MissingContextError(CaseModalContext.name);
  }

  return context;
};
