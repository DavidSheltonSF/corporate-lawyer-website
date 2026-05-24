import { createContext } from 'react';

export type ModalType =
  | 'client'
  | 'register-client'
  | 'case'
  | 'register-case'
  | 'update-case'
  | 'update-client'
  | 'delete-client'
  | 'upload-case-files'
  | 'confirm'
  | 'deadlines'
  | 'case-files'
  | null;

export interface ModalContext {
  currentModal: ModalType;
  modalData: any;

  openModal: <T>(modal: ModalType, data?: T) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContext | null>(null);
