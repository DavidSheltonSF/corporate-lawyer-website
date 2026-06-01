import { RequestFeedback } from '@/components/ui/Feedback/RequestFeedback';
import { DropdownInputWithLabel } from '@/components/ui/Input/DropdownInputWithLabel';
import { InputWithLabel } from '@/components/ui/Input/InputWithLabel';
import { useAuthenticatedUserContext } from '@/hooks/useAuthenticatedUserContext';
import { useForm } from '@/hooks/useForm';
import { DeadlineCountingTypeLabel } from '@/lib/DeadlineCountingTypeLabel';
import { DeadlinePriorityLabel } from '@/lib/DeadlinePriorityLabel';
import { DeadlineTypeLabel } from '@/lib/DeadlineTypeLabel';
import { createDeadline } from '@/services/cases/createDeadline';
import { Deadline } from '@/types/Deadline';
import { RequestState } from '@/types/RequestState';
import { WithId } from '@/types/WithId';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface Props {
  formId: string;
  caseId: string;
  isReadyToSubmit: boolean;
  setIsreadyToSubmit: Dispatch<SetStateAction<boolean>>;
  refetchDeadlines: () => void;
}

export function CreateDeadlineModalForm({
  formId,
  caseId,
  isReadyToSubmit,
  setIsreadyToSubmit,
  refetchDeadlines,
}: Props) {
  const [requestState, setRequestState] = useState<RequestState<WithId<Deadline>>>({
    status: 'idle',
  });

  const { userData } = useAuthenticatedUserContext();

  const { formState, clearForm, hasEmptyFields, updateField } = useForm({
    type: '',
    countingType: '',
    intimationDate: '',
    days: '1',
    priority: '',
  });

  function checkFields() {
    setIsreadyToSubmit(!hasEmptyFields());
  }

  async function handleCreateDeadline(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isReadyToSubmit) return;
    setRequestState({ status: 'loading' });

    const response = await createDeadline(caseId, userData.id, formState);

    if (!response.success) {
      return setRequestState({ ...response, status: 'error' });
    }

    clearForm();
    refetchDeadlines();
    setRequestState({ status: 'ok', data: response.data, message: 'Prazo criado com sucesso!' });
  }

  useEffect(() => {
    checkFields();
  }, [formState]);

  return (
    <form id={formId} onSubmit={handleCreateDeadline} className="flex flex-col gap-[24px]">
      <RequestFeedback requestState={requestState} />
      <div className="flex flex-col min-lg:flex-row gap-[24px]">
        <DropdownInputWithLabel
          id="type-input"
          itemLabel={DeadlineTypeLabel}
          label="Tipo"
          name="type"
          value={formState.type}
          required
          setSelectedValue={(value) => updateField('type', value)}
        />
        <DropdownInputWithLabel
          id="countint-type-input"
          itemLabel={DeadlineCountingTypeLabel}
          label="Tipo de Contagem"
          name="countingType"
          value={formState.countingType}
          required
          setSelectedValue={(value) => updateField('countingType', value)}
        />
      </div>
      <div className="flex flex-col min-lg:flex-row gap-[24px]">
        <InputWithLabel
          type="date"
          id="intimation-date-input"
          name="intimationDate"
          label="Data de intimação"
          value={formState.intimationDate}
          required
          onChange={(e: any) => updateField('intimationDate', e.target.value)}
        />
        <InputWithLabel
          type="number"
          min={1}
          id="days-input"
          name="days"
          label="Dias"
          value={formState.days}
          required
          onChange={(e: any) => updateField('days', e.target.value)}
        />
      </div>

      <DropdownInputWithLabel
        id="priority-input"
        itemLabel={DeadlinePriorityLabel}
        label="Prioridade"
        name="priority"
        value={formState.priority}
        required
        setSelectedValue={(value) => updateField('priority', value)}
      />
    </form>
  );
}
