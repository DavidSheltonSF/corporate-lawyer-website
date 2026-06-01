import { BaseModal } from '@/components/ui/Modal/BaseModal';
import { CreateDeadlineModalForm } from './CreateDeadlineModalForm';
import { useState } from 'react';

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
    <BaseModal
      confirmDisabled={!isReadyToSubmit}
      className="w-[90%] min-md:w-[60%] min-lg:w-fit"
      formId="create-deadline"
      title="Criar novo prazo"
      onClose={close}
    >
      <div className="h-fit p-[24px] overflow-y-auto min-lg:overflow-visible">
        <CreateDeadlineModal.Form
          refetchDeadlines={refetchDeadlines}
          isReadyToSubmit={isReadyToSubmit}
          setIsreadyToSubmit={setIsreadyToSubmit}
          formId={formId}
          caseId={caseId}
        />
      </div>
    </BaseModal>
  );
}
