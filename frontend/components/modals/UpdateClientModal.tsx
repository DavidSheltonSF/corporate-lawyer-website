'use client';
import { GlobalModalProps } from '@/types/GlobalModalProps';
import { UpdateClientModalForm } from './UpdateClientModalForm';
import { FormModal } from '../ui/FormModal/FormModal';

interface Props {
  clientId: string;
  loadClients: () => void;
}

UpdateClientModal.Form = UpdateClientModalForm;

export function UpdateClientModal({ payload, close }: GlobalModalProps<Props>) {
  const { clientId } = payload;

  const formId = 'update-client-form';
  return (
    <FormModal
      formId={formId}
      title="Editar cliente"
      onClose={close}
    >
      <UpdateClientModal.Form clientId={clientId} formId={formId} />
    </FormModal>
  );
}
