import { BaseModal } from '@/components/ui/Modal/BaseModal';
import { CreateDeadlineModalForm } from './CreateDeadlineModalForm';
import { useState } from 'react';
import { ButtonVariant } from '@/components/ui/Button/ButtonVariant';

interface Props {
  caseId: string;
  close: () => void;
}

CreateDeadlineModal.Form = CreateDeadlineModalForm;
export function CreateDeadlineModal({ caseId, close }: Props) {
  const formId = 'create-deadline';
  const [isReadyToSobmit, setIsreadyToSubmit] = useState(false);

  return (
    <BaseModal
      confirmButtonVariant={isReadyToSobmit ? ButtonVariant.PRIMARY : ButtonVariant.DISABLED}
      className="w-[90%] min-md:w-[60%] min-lg:w-fit"
      formId="create-deadline"
      title="Criar novo prazo"
      onClose={close}
    >
      <div className="h-fit p-[24px] overflow-y-auto min-lg:overflow-visible">
        <CreateDeadlineModal.Form
          isReadyToSubmit={isReadyToSobmit}
          setIsreadyToSubmit={setIsreadyToSubmit}
          formId={formId}
          caseId={caseId}
        />
      </div>
    </BaseModal>
  );
}
