import { createContext, Dispatch, SetStateAction } from 'react';
import { ModalContextType } from './ModalContextType';
import { WithId } from '@/types/WithId';
import { UserIdentity } from '@/types/UserIdentity';

export type ClientCardOptionsModalContext = ModalContextType & {
  selectedClient: WithId<UserIdentity> | null;
  setSelectedClient: Dispatch<SetStateAction<WithId<UserIdentity> | null>>;
};

export const ClientCardOptionsModalContext = createContext<
  ClientCardOptionsModalContext | undefined
>(undefined);
