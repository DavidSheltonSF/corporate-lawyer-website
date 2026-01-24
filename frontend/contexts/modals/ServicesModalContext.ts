import { createContext, Dispatch, SetStateAction } from 'react';
import { ModalContextType } from './ModalContextType';

export const ServicesModalContext = createContext<
  | (ModalContextType & {
      serviceAreaId: string;
      setServiceAreaId: Dispatch<SetStateAction<string>>;
    })
  | undefined
>(undefined);
