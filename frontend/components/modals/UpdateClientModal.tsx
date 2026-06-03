'use client';
import { GlobalModalProps } from '@/types/GlobalModalProps';
import { UpdateClientModalForm } from './UpdateClientModalForm';
import { FormModal } from '../ui/FormModal/FormModal';
import { useState } from 'react';

interface Props {
  clientId: string;
  refetchClients: () => void;
}

UpdateClientModal.Form = UpdateClientModalForm;

export function UpdateClientModal({ payload, close }: GlobalModalProps<Props>) {
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);

  const { clientId } = payload;

  const formId = 'update-client-form';
  return (
    <FormModal
      confirmDisabled={!isReadyToSubmit}
      formId={formId}
      title="Editar cliente"
      onClose={close}
    >
      <UpdateClientModal.Form
        isReadyToSubmit={isReadyToSubmit}
        setIsReadyToSubmit={setIsReadyToSubmit}
        clientId={clientId}
        formId={formId}
      />
    </FormModal>
  );
}
