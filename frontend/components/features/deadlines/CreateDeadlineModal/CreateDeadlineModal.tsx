import { CreateDeadlineModalForm } from './CreateDeadlineModalForm';
import { useState } from 'react';
import { FormModal } from '@/components/ui/FormModal/FormModal';

interface Props {
  caseId: string;
  refetchDeadlines: () => void;
  close: () => void;
}

CreateDeadlineModal.Form = CreateDeadlineModalForm;
export function CreateDeadlineModal({ caseId, close, refetchDeadlines }: Props) {
  const formId = 'create-deadline';
  const [isReadyToSubmit, setIsreadyToSubmit] = useState(false);

  return (
    <FormModal
      confirmDisabled={!isReadyToSubmit}
      formId="create-deadline"
      title="Criar novo prazo"
      onClose={close}
    >
      <CreateDeadlineModal.Form
        refetchDeadlines={refetchDeadlines}
        isReadyToSubmit={isReadyToSubmit}
        setIsreadyToSubmit={setIsreadyToSubmit}
        formId={formId}
        caseId={caseId}
      />
    </FormModal>
  );
}
