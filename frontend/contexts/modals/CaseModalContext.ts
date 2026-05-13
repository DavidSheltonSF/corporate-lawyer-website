import { createContext, Dispatch, SetStateAction } from 'react';
import { ModalContextType } from './ModalContextType';

export type CaseModalContext = ModalContextType & { onClose: any};

export const CaseModalContext = createContext<CaseModalContext | undefined>(undefined);
