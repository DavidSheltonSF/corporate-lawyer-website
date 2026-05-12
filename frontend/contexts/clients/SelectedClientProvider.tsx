'use client';

import { useState } from 'react';
import { SelectedClientContext } from './SelectedClientContext';

interface Props {
  children: React.ReactNode;
}

export function SelectedClientProvider({ children }: Props) {
  const [selectedClientId, setSelectedClientId] = useState('');
  return (
    <SelectedClientContext.Provider value={{ selectedClientId, setSelectedClientId }}>
      {children}
    </SelectedClientContext.Provider>
  );
}
