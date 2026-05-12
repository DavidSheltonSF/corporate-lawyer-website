import { Dispatch, SetStateAction, createContext } from 'react';

export interface SelectedClientContext {
  selectedClientId: string;
  setSelectedClientId: Dispatch<SetStateAction<string>>;
}

export const SelectedClientContext = createContext<SelectedClientContext | undefined>(undefined);
