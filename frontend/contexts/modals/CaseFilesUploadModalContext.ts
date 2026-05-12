import { createContext, Dispatch, SetStateAction } from 'react';
import { ModalContextType } from './ModalContextType';

export const CaseFilesUploadModalContext = createContext<ModalContextType | undefined>(undefined);
