'use client';
import { useState } from 'react';
import { FormModal } from '../ui/FormModal/FormModal';
import { RegisterCaseModalForm } from './RegisterCaseModalForm';

interface Props {
  clientId: string;
  isOpen: boolean;
  close: () => void;
}

RegisterCaseModal.Form = RegisterCaseModalForm;
export function RegisterCaseModal({ isOpen, close, clientId }: Props) {
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);
  const formId = 'create-case-form';

  return (
    isOpen && (
      <FormModal
        formId={formId}
        confirmDisabled={!isReadyToSubmit}
        title="Novo Processo"
        onClose={() => {
          close();
        }}
      >
        <RegisterCaseModal.Form
          isReadyToSubmit={isReadyToSubmit}
          setIsReadyToSubmit={setIsReadyToSubmit}
          formId={formId}
          clientId={clientId}
        />
      </FormModal>
    )
  );
}
