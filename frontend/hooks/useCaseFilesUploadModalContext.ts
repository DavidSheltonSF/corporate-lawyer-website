import { CaseFilesUploadModalContext } from '@/contexts/modals/CaseFilesUploadModalContext';
import { MissingContextError } from '@/errors/MissingContextError';
import { useContext } from 'react';

export const useCaseFilesUploadModalContext = (): CaseFilesUploadModalContext => {
  const context = useContext(CaseFilesUploadModalContext);
  if (!context) {
    throw new MissingContextError(CaseFilesUploadModalContext.name);
  }
  return context;
};
