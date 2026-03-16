import { createContext } from 'react';
import { ModalContextType } from './ModalContextType';

export type DeleteClientModalContext = ModalContextType & {
  selectedClientId: string | null;
};

export const DeleteClientModalContext = createContext<DeleteClientModalContext | undefined>(undefined);
