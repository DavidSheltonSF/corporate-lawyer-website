'use client';
import { Dispatch, SetStateAction } from 'react';
import { BaseModal } from '../ui/Modal/BaseModal';
import { RegisterClientModalForm } from './RegisterClientModalForm';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

RegisterClientModal.Form = RegisterClientModalForm;
export function RegisterClientModal({ isOpen, setIsOpen }: Props) {
  const formId = 'create-client-form';

  return (
    isOpen && (
      <BaseModal
        formId={formId}
        className={
          'top-[2%] min-lg:top-[10%] left-1/2 translate-x-[-50%] w-[90%] min-md:w-[678px] h-fit'
        }
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <RegisterClientModal.Form formId={formId} />
      </BaseModal>
    )
  );
}
