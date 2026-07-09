import { ModalType } from '@/types/ModalType';
import { create } from 'zustand';

interface ModalMeta {
  type: ModalType;
  payload?: any;
}

export interface OpenModalConfig {
  replace?: boolean;
}
export interface OpenModalParams {
  modal: ModalMeta;
  config?: OpenModalConfig;
}

interface ModalStore {
  modalStack: ModalMeta[];

  openModal: (params: OpenModalParams) => void;
  closeModal: () => void;
  getCurrentModal: () => ModalMeta | null;
}

export const useModalStore = create<ModalStore>((set, get) => ({
  modalStack: [],

  openModal: (params: OpenModalParams) => {
    const {modal, config} = params

    set((state) => {
      if (config?.replace) {
        state.modalStack.pop();
      }

      console.log(state.modalStack);
      const openModal = {
        type: modal.type,
        payload: modal.payload,
      };
      return {
        modalStack: state.modalStack.some((modal) => modal.type === openModal.type)
          ? state.modalStack
          : [...state.modalStack, openModal],
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
