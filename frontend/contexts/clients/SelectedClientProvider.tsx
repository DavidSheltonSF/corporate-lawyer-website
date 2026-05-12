'use client';

import { useState } from 'react';
import { SelectedClientContext } from './SelectedClientContext';
import { UserIdentity } from '@/types/UserIdentity';
import { WithId } from '@/types/WithId';

interface Props {
  children: React.ReactNode;
}

export function SelectedClientProvider({ children }: Props) {
  const [selectedClientSlice, setSelectedClientSlice] = useState<WithId<UserIdentity> | null>(null);
  return (
    <SelectedClientContext.Provider value={{ selectedClientSlice, setSelectedClientSlice }}>
      {children}
    </SelectedClientContext.Provider>
  );
}
