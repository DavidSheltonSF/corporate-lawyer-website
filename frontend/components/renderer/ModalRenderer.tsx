'use client';

import { useModal } from '@/hooks/useModal';
import { ClientModal } from '../features/clients/ClientModal/ClientModal';
import { CaseModal } from '../features/cases/CaseModal/CaseModal';
import { UpdateCaseModal } from '../features/cases/UpdateCaseModal/UpdateCaseModal';

import { ConfirmModal } from '../ui/Modal/ConfirmModal';
import { UpdateClientModal } from '../modals/UpdateClientModal';
import { DeleteClientModal } from '../modals/DeleteClientModal';
import { DeadlineModal } from '../features/deadlines/DeadlineModal/DeadlineModal';
import { CaseFilesModal } from '../features/cases/CaseFilesModal/CaseFilesModal';
import { SuccessModal } from '../ui/Modal/SuccessModal';

export function ModalRenderer() {
  const { currentModal, modalData, closeModal } = useModal();

  switch (currentModal) {
    case 'client':
      return <ClientModal payload={modalData} close={closeModal} />;

    case 'case':
      return <CaseModal payload={modalData} close={closeModal} />;

    case 'update-case':
      return <UpdateCaseModal payload={modalData} close={closeModal} />;

    case 'update-client':
      return <UpdateClientModal payload={modalData} close={closeModal} />;

    case 'delete-client':
      return <DeleteClientModal payload={modalData} close={closeModal} />;

    case 'confirm':
      return <ConfirmModal payload={modalData} close={closeModal} />;

    case 'success':
      return <SuccessModal payload={modalData} close={closeModal} />;

    case 'deadlines':
      return <DeadlineModal payload={modalData} close={closeModal} />;

    case 'case-files':
      return <CaseFilesModal payload={modalData} close={closeModal} />;

    default:
      return null;
  }
}
