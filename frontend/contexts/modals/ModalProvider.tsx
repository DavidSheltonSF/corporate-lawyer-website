'use client';
import { PropsWithChildren, useState } from 'react';
import { ModalType, ModalContext, PreviousModal } from './ModalContext';

export function ModalProvider({ children }: PropsWithChildren) {
  const [currentModal, setCurrentModal] = useState<ModalType>(null);
  const [modalData, setModalData] = useState<unknown>();
  const [previousModal, setPreviousModal] = useState<PreviousModal | undefined>();

  function openModal(modal: ModalType, data: unknown, previousModal?: PreviousModal) {
    setCurrentModal(modal);
    setModalData(data);
    setPreviousModal(previousModal);
  }

  function closeModal() {
    if (previousModal) {
      setCurrentModal(previousModal.type);
      setModalData(previousModal.data);
      setPreviousModal(undefined);
      return;
    }
    setCurrentModal(null);
    setModalData(undefined);
  }

  return (
    <ModalContext.Provider
      value={{
        currentModal,
        modalData,
        openModal,
        closeModal,
        previousModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
