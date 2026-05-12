import { UserSlice } from '@/types/UserSlice';
import { WithId } from '@/types/WithId';
import { Dispatch, SetStateAction, createContext } from 'react';

export interface SelectedClientContext {
  selectedClientSlice: WithId<UserSlice> | null;
  setSelectedClientSlice: Dispatch<SetStateAction<WithId<UserSlice> | null>>;
}

export const SelectedClientContext = createContext<SelectedClientContext | undefined>(undefined);
