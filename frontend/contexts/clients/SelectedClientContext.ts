import { UserIdentity } from '@/types/UserIdentity';
import { WithId } from '@/types/WithId';
import { Dispatch, SetStateAction, createContext } from 'react';

export interface SelectedClientContext {
  selectedClientSlice: WithId<UserIdentity> | null;
  setSelectedClientSlice: Dispatch<SetStateAction<WithId<UserIdentity> | null>>;
}

export const SelectedClientContext = createContext<SelectedClientContext | undefined>(undefined);
