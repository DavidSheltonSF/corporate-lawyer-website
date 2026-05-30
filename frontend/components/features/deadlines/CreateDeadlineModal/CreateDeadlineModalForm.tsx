import { DropdownInputWithLabel } from '@/components/ui/Input/DropdownInputWithLabel';
import { InputWithLabel } from '@/components/ui/Input/InputWithLabel';
import { useAuthenticatedUserContext } from '@/hooks/useAuthenticatedUserContext';
import { DeadlineCountingTypeLabel } from '@/lib/DeadlineCountingTypeLabel';
import { DeadlinePriorityLabel } from '@/lib/DeadlinePriorityLabel';
import { DeadlineTypeLabel } from '@/lib/DeadlineTypeLabel';
import { createDeadline } from '@/services/cases/createDeadline';
import { Deadline } from '@/types/Deadline';
import { RequestState } from '@/types/RequestState';
import { WithId } from '@/types/WithId';
import { useState } from 'react';

interface Props {
  formId: string;
  caseId: string;
}

export function CreateDeadlineModalForm({ formId, caseId }: Props) {
  const [requestState, setRequestState] = useState<RequestState<WithId<Deadline>>>();

  const { userData } = useAuthenticatedUserContext();

  async function handleCreateDeadline(formData: FormData) {
    const response = await createDeadline(caseId, userData.id, formData);

    if (!response.success) {
      return setRequestState({ ...response, status: 'error' });
    }

    setRequestState({ status: 'ok', data: response.data });
  }

  return (
    <form id={formId} action={handleCreateDeadline} className="flex flex-col gap-[24px]">
      <div className="flex flex-col min-lg:flex-row gap-[24px]">
        <DropdownInputWithLabel
          id="type-input"
          itemLabel={DeadlineTypeLabel}
          label="Tipo"
          name="type"
        />
        <DropdownInputWithLabel
          id="countint-type-input"
          itemLabel={DeadlineCountingTypeLabel}
          label="Tipo de Contagem"
          name="countingType"
        />
      </div>
      <div className="flex flex-col min-lg:flex-row gap-[24px]">
        <InputWithLabel
          type="date"
          id="intimation-date-input"
          name="intimationDate"
          label="Data de intimação"
        />
        <InputWithLabel type="number" min={1} id="days-input" name="days" label="Dias" />
      </div>

      <DropdownInputWithLabel
        id="priority-input"
        itemLabel={DeadlinePriorityLabel}
        label="Prioridade"
        name="priority"
      />
    </form>
  );
}
