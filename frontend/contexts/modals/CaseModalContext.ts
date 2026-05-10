import { createContext, Dispatch, SetStateAction } from 'react';
import { ModalContextType } from './ModalContextType';

export type CaseModalContext = ModalContextType & {
  selectedCaseId: string;
  setSelectedCaseId: Dispatch<SetStateAction<string>>;
};
export const CaseModalContext = createContext<CaseModalContext | undefined>(undefined);
