import { Dispatch, SetStateAction, createContext } from 'react';

export interface SelectedCaseContext {
  selectedCaseId: string;
  setSelectedCaseId: Dispatch<SetStateAction<string>>;
}

export const SelectedCaseContext = createContext<SelectedCaseContext | undefined>(undefined);
