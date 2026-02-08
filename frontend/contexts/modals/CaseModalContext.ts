import { createContext } from 'react';
import { ModalContextType } from './ModalContextType';

export type CaseModalContext = ModalContextType & { caseId: string | null; setCaseId: any };

export const CaseModalContext = createContext<CaseModalContext | undefined>(undefined);
