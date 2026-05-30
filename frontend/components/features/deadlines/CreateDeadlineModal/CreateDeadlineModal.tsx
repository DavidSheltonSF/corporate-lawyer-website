import { DropdownInputWithLabel } from '@/components/ui/Input/DropdownInputWithLabel';
import { InputWithLabel } from '@/components/ui/Input/InputWithLabel';
import { BaseModal } from '@/components/ui/Modal/BaseModal';
import { useAuthenticatedUserContext } from '@/hooks/useAuthenticatedUserContext';
import { DeadlineCountingTypeLabel } from '@/lib/DeadlineCountingTypeLabel';
import { DeadlinePriorityLabel } from '@/lib/DeadlinePriorityLabel';
import { DeadlineTypeLabel } from '@/lib/DeadlineTypeLabel';
import { createDeadline } from '@/services/cases/createDeadline';
import { Deadline } from '@/types/Deadline';
import { DeadlineCountingType } from '@/types/DeadlineCountingType';
import { RequestState } from '@/types/RequestState';
import { WithId } from '@/types/WithId';
import { useState } from 'react';
import { CreateDeadlineModalForm } from './CreateDeadlineModalForm';

interface Props {
  caseId: string;
  close: () => void;
}

CreateDeadlineModal.Form = CreateDeadlineModalForm;
export function CreateDeadlineModal({ caseId, close }: Props) {
  const formId = 'create-deadline';

  return (
    <BaseModal
      className="w-[90%] min-md:w-[60%] min-lg:w-fit"
      formId="create-deadline"
      title="Criar novo prazo"
      onClose={close}
    >
      <div className="h-fit p-[24px] overflow-y-auto min-lg:overflow-visible">
        <CreateDeadlineModal.Form formId={formId} caseId={caseId} />
      </div>
    </BaseModal>
  );
}
