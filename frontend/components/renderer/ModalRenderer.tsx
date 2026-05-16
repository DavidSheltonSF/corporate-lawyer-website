'use client';

import { useModal } from '@/hooks/useModal';
import { ClientModal } from '../features/clients/ClientModal/ClientModal';
import { CaseModal } from '../features/cases/CaseModal/CaseModal';
import { UpdateCaseModal } from '../modals/UpdateCaseModal';

import { ConfirmModal } from '../ui/Modal/ConfirmModal';
import { UpdateClientModal } from '../modals/UpdateClientModal';

export function ModalRenderer() {
  const { currentModal, modalData, openModal, closeModal } = useModal();

  switch (currentModal) {
    case 'client':
      return <ClientModal data={modalData} close={closeModal} />;

    case 'case':
      return <CaseModal data={modalData} close={closeModal} />;

    case 'update-case':
      return <UpdateCaseModal data={modalData} close={closeModal} />;

    case 'update-client':
      return <UpdateClientModal data={modalData} close={closeModal} />;

    case 'confirm':
      return <ConfirmModal data={modalData} close={closeModal} />;

    default:
      return null;
  }
}
