import { createContext, Dispatch, SetStateAction } from 'react';
import { ModalContextType } from './ModalContextType';

export type ClientCardOptionsModalContext = ModalContextType & {
  selectedClientId: string | null;
  setSelectedClientId: Dispatch<SetStateAction<string | null>>;
};

export const ClientCardOptionsModalContext = createContext<
  ClientCardOptionsModalContext | undefined
>(undefined);
