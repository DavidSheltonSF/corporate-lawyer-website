import { createContext, Dispatch, SetStateAction } from 'react';
import { ModalContextType } from './ModalContextType';

export const CaseModalContext = createContext<ModalContextType | undefined>(undefined);
