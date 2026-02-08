import { CaseModalContext } from '@/contexts/modals/CaseModalContext';
import { useContext } from 'react';

export const useCaseModalContext = (): CaseModalContext | undefined => useContext(CaseModalContext);
