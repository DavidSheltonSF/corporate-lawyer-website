'use client';

import { useState } from 'react';
import { SelectedClientContext } from './SelectedClientContext';
import { UserSlice } from '@/types/UserSlice';
import { WithId } from '@/types/WithId';

interface Props {
  children: React.ReactNode;
}

export function SelectedClientProvider({ children }: Props) {
  const [selectedClientSlice, setSelectedClientSlice] = useState<WithId<UserSlice> | null>(null);
  return (
    <SelectedClientContext.Provider value={{ selectedClientSlice, setSelectedClientSlice }}>
      {children}
    </SelectedClientContext.Provider>
  );
}
