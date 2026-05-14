import { createContext } from 'react';

export type ModalType =
  | 'client'
  | 'register-client'
  | 'case'
  | 'register-case'
  | 'upload-case-files'
  | 'notifications'
  | null;

export interface ModalContext {
  currentModal: ModalType;
  modalData: unknown;

  openModal: (modal: ModalType, data: unknown) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContext | null>(null);
