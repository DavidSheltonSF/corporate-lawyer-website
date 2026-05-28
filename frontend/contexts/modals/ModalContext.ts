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

export interface PreviousModal<T = unknown> {
  type: ModalType | null;
  data: T;
}

export interface ModalContext {
  currentModal: ModalType;
  modalData: any;
  previousModal?: PreviousModal;

  openModal: <T>(modal: ModalType, data?: T, previousModal?: PreviousModal) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContext | null>(null);
