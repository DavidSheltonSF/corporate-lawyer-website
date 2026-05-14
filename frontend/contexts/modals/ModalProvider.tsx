'use client'
import { PropsWithChildren, useState } from 'react';
import { ModalType, ModalContext } from './ModalContext';

export function ModalProvider({ children }: PropsWithChildren) {
  const [currentModal, setCurrentModal] = useState<ModalType>(null);
  const [modalData, setModalData] = useState<unknown>();

  function openModal(modal: ModalType, data: unknown) {
    setCurrentModal(modal);
    setModalData(data);
  }

  function closeModal() {
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
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
