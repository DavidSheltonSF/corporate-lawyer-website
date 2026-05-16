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
  | 'notifications'
  | 'confirm'
  | null;

export interface ModalContext {
  currentModal: ModalType;
  modalData: any;

  openModal: (modal: ModalType, data: unknown) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContext | null>(null);
