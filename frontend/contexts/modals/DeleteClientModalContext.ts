import { createContext } from 'react';
import { ModalContextType } from './ModalContextType';
import { WithId } from '@/types/WithId';
import { UserIdentity } from '@/types/UserIdentity';

export type DeleteClientModalContext = ModalContextType & {
  selectedClient: WithId<UserIdentity> | null;
};

export const DeleteClientModalContext = createContext<DeleteClientModalContext | undefined>(
  undefined
);
