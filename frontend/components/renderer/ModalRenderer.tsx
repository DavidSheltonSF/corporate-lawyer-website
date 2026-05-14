'use client'

import { useModal } from "@/hooks/useModal";
import { ClientModal } from "../features/clients/ClientModal/ClientModal";

export function ModalRenderer() {
  const {currentModal, modalData, openModal, closeModal} = useModal()

  switch (currentModal) {
    case 'client':
      return <ClientModal data={modalData} close={closeModal} />
  
    default:
      return null;
  }
}