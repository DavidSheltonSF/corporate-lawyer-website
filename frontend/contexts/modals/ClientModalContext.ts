import { createContext } from 'react';
import { ModalContextType } from './ModalContextType';

export const ClientModalContext = createContext<ModalContextType | undefined>(undefined);
