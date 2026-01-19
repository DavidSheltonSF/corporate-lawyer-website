import { Dispatch } from 'react';

export interface ModalContextType {
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
}
