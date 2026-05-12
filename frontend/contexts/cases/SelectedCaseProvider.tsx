'use client';

import { useState } from 'react';
import { SelectedCaseContext } from './SelectedCaseContext';

interface Props {
  children: React.ReactNode;
}

export function SelectedCaseProvider({children}: Props) {
  const [selectedCaseId, setSelectedCaseId] = useState('');
  return (
    <SelectedCaseContext.Provider
      value={{ selectedCaseId, setSelectedCaseId }}
    >{children}</SelectedCaseContext.Provider>
  );
}
