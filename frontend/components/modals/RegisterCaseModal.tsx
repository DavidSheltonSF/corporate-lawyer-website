'use client';
import { BaseModal } from '../ui/Modal/BaseModal';
import { RegisterCaseModalForm } from './RegisterCaseModalForm';

interface Props {
  clientId: string;
  isOpen: boolean;
  close: () => void;
}

RegisterCaseModal.Form = RegisterCaseModalForm;
export function RegisterCaseModal({ isOpen, close, clientId }: Props) {
  const formId = 'create-case-form';

  return (
    isOpen && (
      <BaseModal
        formId={formId}
        title="Novo Processo"
        className={'w-[90%] min-md:w-[60%] min-lg:w-[678px] h-[90%] h-fit'}
        onClose={() => {
          close();
        }}
      >
        <RegisterCaseModal.Form formId={formId} clientId={clientId} />
      </BaseModal>
    )
  );
}
