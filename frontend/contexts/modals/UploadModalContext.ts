import { createContext } from 'react';
import { ModalContextType } from './ModalContextType';

export const UploadModalContext = createContext<ModalContextType | undefined>(undefined);
