'use case';
import { UpdateCaseModalForm } from './UpdateCaseModalForm';
import { GlobalModalProps } from '@/types/GlobalModalProps';
import { FormModal } from '@/components/ui/FormModal/FormModal';
import { useState } from 'react';

interface Props {
  caseId: string;
  refetchCases: () => void;
}

UpdateCaseModal.Form = UpdateCaseModalForm;

export function UpdateCaseModal({ payload, close }: GlobalModalProps<Props>) {
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);
  const { caseId, refetchCases } = payload;
  const formId = 'update-case-form';

  return (
    <FormModal confirmDisabled={!isReadyToSubmit} title="Alterar processo" formId={formId} onClose={close}>
      <UpdateCaseModal.Form formId={formId} caseId={caseId} refetchCases={refetchCases} isReadyToSubmit={isReadyToSubmit} setIsReadyToSubmit={setIsReadyToSubmit}/>
    </FormModal>
  );
}
