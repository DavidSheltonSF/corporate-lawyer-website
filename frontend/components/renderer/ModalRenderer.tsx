'use client';

import { ClientModal } from '../features/clients/ClientModal/ClientModal';
import { CaseModal } from '../features/cases/CaseModal/CaseModal';
import { UpdateCaseModal } from '../features/cases/UpdateCaseModal/UpdateCaseModal';
import { ConfirmModal } from '../ui/Modal/ConfirmModal';
import { UpdateClientModal } from '../modals/UpdateClientModal';
import { DeleteClientModal } from '../modals/DeleteClientModal';
import { DeadlineModal } from '../features/deadlines/DeadlineModal/DeadlineModal';
import { CaseFilesModal } from '../features/cases/CaseFilesModal/CaseFilesModal';
import { SuccessModal } from '../ui/Modal/SuccessModal';
import { ErrorModal } from '../ui/Modal/ErrorModal';
import { CreateDeadlineModal } from '../features/deadlines/CreateDeadlineModal/CreateDeadlineModal';
import { useModalStore } from '@/stores/useModalStore';
import { ClientCasesModal } from '../features/clients/ClientCasesModal/ClientCasesModal';

export function ModalRenderer() {
  const { getCurrentModal, closeModal } = useModalStore();
  const currentModal = getCurrentModal();

  switch (currentModal?.type) {
    case 'client':
      return <ClientModal payload={currentModal.payload} close={closeModal} />;

    case 'client-cases':
      return <ClientCasesModal payload={currentModal.payload} close={closeModal} />;

    case 'case':
      return <CaseModal payload={currentModal.payload} close={closeModal} />;

    case 'update-case':
      return <UpdateCaseModal payload={currentModal.payload} close={closeModal} />;

    case 'update-client':
      return <UpdateClientModal payload={currentModal.payload} close={closeModal} />;

    case 'delete-client':
      return <DeleteClientModal payload={currentModal.payload} close={closeModal} />;

    case 'confirm':
      return <ConfirmModal payload={currentModal.payload} close={closeModal} />;

    case 'success':
      return <SuccessModal payload={currentModal.payload} close={closeModal} />;

    case 'error':
      return <ErrorModal payload={currentModal.payload} close={closeModal} />;

    case 'deadlines':
      return <DeadlineModal payload={currentModal.payload} close={closeModal} />;

    case 'create-deadline':
      return <CreateDeadlineModal payload={currentModal.payload} close={closeModal} />;

    case 'case-files':
      return <CaseFilesModal payload={currentModal.payload} close={closeModal} />;

    default:
      return null;
  }
}
