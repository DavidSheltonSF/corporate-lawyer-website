'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import { RegisterClientModalForm } from './RegisterClientModalForm';
import { FormModal } from '../ui/FormModal/FormModal';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

RegisterClientModal.Form = RegisterClientModalForm;
export function RegisterClientModal({ isOpen, setIsOpen }: Props) {
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);
  const formId = 'create-client-form';

  return (
    isOpen && (
      <FormModal
        confirmDisabled={!isReadyToSubmit}
        title="Criar novo cliente"
        formId={formId}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <RegisterClientModal.Form
          isReadyToSubmit={isReadyToSubmit}
          setIsReadyToSubmit={setIsReadyToSubmit}
          formId={formId}
        />
      </FormModal>
    )
  );
}
