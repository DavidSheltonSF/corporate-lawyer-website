import { createContext, Dispatch, SetStateAction } from 'react';

export type DynamicSectionContextType = {
  setSelectedSection: Dispatch<SetStateAction<number>>;
};

export const DynamicSectionContext= createContext<DynamicSectionContextType | undefined>(undefined);
