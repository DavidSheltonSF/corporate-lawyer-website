'use client';
import { Dispatch, SetStateAction } from 'react';
import { RegisterClientModalForm } from './RegisterClientModalForm';
import { FormModal } from '../ui/FormModal/FormModal';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

RegisterClientModal.Form = RegisterClientModalForm;
export function RegisterClientModal({ isOpen, setIsOpen }: Props) {
  const formId = 'create-client-form';

  return (
    isOpen && (
      <FormModal
      title='Criar novo cliente'
        formId={formId}

        onClose={() => {
          setIsOpen(false);
        }}
      >
        <RegisterClientModal.Form formId={formId} />
      </FormModal>
    )
  );
}
