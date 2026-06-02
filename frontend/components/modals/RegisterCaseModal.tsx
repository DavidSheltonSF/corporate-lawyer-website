'use client';
import { BaseModal } from '../ui/Modal/BaseModal';
import { RegisterCaseModalForm } from './RegisterCaseModalForm';

interface Props {
  selectedClientId: string;
  isOpen: boolean;
  close: () => void;
}

RegisterCaseModal.Form = RegisterCaseModalForm;
export function RegisterCaseModal({ isOpen, close, selectedClientId }: Props) {
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
        <RegisterCaseModal.Form formId={formId} clientId={selectedClientId} />
      </BaseModal>
    )
  );
}
