'use client';
import { GlobalModalProps } from '@/types/GlobalModalProps';
import { UpdateClientModalForm } from './UpdateClientModalForm';
import { FormModal } from '../ui/FormModal/FormModal';
import { useState } from 'react';

interface Props {
  clientId: string;
  onUpdate: (clientId: string, data: Record<string, string>) => void;
}

UpdateClientModal.Form = UpdateClientModalForm;

export function UpdateClientModal({ payload, close }: GlobalModalProps<Props>) {
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);

  const { clientId, onUpdate } = payload;

  const formId = 'update-client-form';
  return (
    <FormModal
      confirmDisabled={!isReadyToSubmit}
      formId={formId}
      title="Editar cliente"
      onClose={close}
    >
      <UpdateClientModal.Form
      onSubmit={onUpdate}
        isReadyToSubmit={isReadyToSubmit}
        setIsReadyToSubmit={setIsReadyToSubmit}
        clientId={clientId}
        formId={formId}
      />
    </FormModal>
  );
}
