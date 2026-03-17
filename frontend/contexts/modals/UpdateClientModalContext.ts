import { createContext } from 'react';
import { ModalContextType } from './ModalContextType';

export type UpdateClientModalContext = ModalContextType & {
  selectedClientId: string | null;
};

export const UpdateClientModalContext = createContext<UpdateClientModalContext | undefined>(
  undefined
);
