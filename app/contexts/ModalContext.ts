import { createContext, Dispatch, SetStateAction } from 'react';

type ModalContextType = {
  modalIsOpen: boolean | null;
  setModalIsOpen: Dispatch<SetStateAction<boolean>> | null;
  serviceAreaId: string | null;
  setServiceAreaId: Dispatch<SetStateAction<string>> | null;
};

export const ModalContext = createContext<ModalContextType | undefined>(undefined);
