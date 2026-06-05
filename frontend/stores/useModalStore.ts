import { ModalType } from '@/types/ModalType';
import { create } from 'zustand';

interface ModalMeta {
  type: ModalType;
  payload?: any;
}

interface ModalStore {
  modalStack: ModalMeta[];

  openModal: (modal: ModalMeta) => void;
  closeModal: () => void;
  getCurrentModal: () => ModalMeta | null;
}

export const useModalStore = create<ModalStore>((set, get) => ({
  modalStack: [],

  openModal: (modal: ModalMeta) => {
    set((state) => {
      const openModal = {
        type: modal.type,
        payload: modal.payload,
      };
      return {
        modalStack: [...state.modalStack, openModal],
      };
    });
  },

  closeModal: () => {
    set((state) => {
      const newModalStack = [...state.modalStack];
      newModalStack.pop();
      return {
        modalStack: newModalStack,
      };
    });
  },

  getCurrentModal: () => {
    return get().modalStack.at(-1) ?? null;
  },
}));
