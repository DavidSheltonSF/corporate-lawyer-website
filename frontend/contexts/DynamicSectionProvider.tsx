import { Dispatch, SetStateAction } from 'react';
import { DynamicSectionContext } from './DynamicSectionContext';

interface Props {
  setSelectedSection: Dispatch<SetStateAction<number>>;
  children: React.ReactNode;
}

export function DynamicSectionProvider({setSelectedSection, children }: Props) {
  return (
    <DynamicSectionContext.Provider value={{setSelectedSection}}>
      {children}
    </DynamicSectionContext.Provider>
  );
}
