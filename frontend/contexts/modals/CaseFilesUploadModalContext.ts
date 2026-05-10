import { createContext, Dispatch, SetStateAction } from 'react';
import { ModalContextType } from './ModalContextType';

export type CaseFilesUploadModalContext = ModalContextType & {
  selectedCaseId: string;
};
export const CaseFilesUploadModalContext = createContext<CaseFilesUploadModalContext | undefined>(
  undefined
);
