'use client';

import { useModal } from '@/hooks/useModal';
import { ClientModal } from '../features/clients/ClientModal/ClientModal';
import { CaseModal } from '../features/cases/CaseModal/CaseModal';

export function ModalRenderer() {
  const { currentModal, modalData, openModal, closeModal } = useModal();

  switch (currentModal) {
    case 'client':
      return <ClientModal data={modalData} close={closeModal} />;

    case 'case':
      return <CaseModal data={modalData} close={closeModal} />;

    default:
      return null;
  }
}
