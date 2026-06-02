'use client';
import { FormModal } from '../ui/FormModal/FormModal';
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
      <FormModal
        formId={formId}
        title="Novo Processo"
        onClose={() => {
          close();
        }}
      >
        <RegisterCaseModal.Form formId={formId} clientId={clientId} />
      </FormModal>
    )
  );
}
