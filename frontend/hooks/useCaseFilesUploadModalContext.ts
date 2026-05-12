import { CaseFilesUploadModalContext } from '@/contexts/modals/CaseFilesUploadModalContext';
import { ModalContextType } from '@/contexts/modals/ModalContextType';
import { MissingContextError } from '@/errors/MissingContextError';
import { useContext } from 'react';

export const useCaseFilesUploadModalContext = (): ModalContextType => {
  const context = useContext(CaseFilesUploadModalContext);
  if (!context) {
    throw new MissingContextError(CaseFilesUploadModalContext.name);
  }
  return context;
};
