'use case';
import { UpdateCaseModalForm } from './UpdateCaseModalForm';
import { GlobalModalProps } from '@/types/GlobalModalProps';
import { FormModal } from '@/components/ui/FormModal/FormModal';
import { useState } from 'react';

interface Props {
  caseId: string;
  onSubmit: (caseId: string, data: Record<string, string>) => any;
}

UpdateCaseModal.Form = UpdateCaseModalForm;

export function UpdateCaseModal({ payload, close }: GlobalModalProps<Props>) {
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);
  const { caseId, onSubmit } = payload;
  const formId = 'update-case-form';

  return (
    <FormModal
      confirmDisabled={!isReadyToSubmit}
      title="Alterar processo"
      formId={formId}
      onClose={close}
    >
      <UpdateCaseModal.Form
        formId={formId}
        caseId={caseId}
        onSubmit={onSubmit}
        isReadyToSubmit={isReadyToSubmit}
        setIsReadyToSubmit={setIsReadyToSubmit}
      />
    </FormModal>
  );
}
