import { RequestFeedback } from '@/components/ui/Feedback/RequestFeedback';
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
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface Props {
  formId: string;
  caseId: string;
  isReadyToSubmit: boolean;
  setIsreadyToSubmit: Dispatch<SetStateAction<boolean>>;
}

export function CreateDeadlineModalForm({
  formId,
  caseId,
  isReadyToSubmit,
  setIsreadyToSubmit,
}: Props) {
  const [requestState, setRequestState] = useState<RequestState<WithId<Deadline>>>({
    status: 'idle',
  });
  const [formData, setFormData] = useState({
    type: '',
    countingType: '',
    intimationDate: '',
    days: '1',
    priority: '',
  });

  const { userData } = useAuthenticatedUserContext();

  function updateField(name: string, value: string) {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function resetForm() {
    setFormData({
      type: '',
      countingType: '',
      intimationDate: '',
      days: '1',
      priority: '',
    });
  }

  function checkFields() {
    const emptyFields = Object.values(formData).filter((value) => value.trim() === '');
    console.log(emptyFields);
    setIsreadyToSubmit(emptyFields.length === 0 ? true : false);
  }

  async function handleCreateDeadline(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isReadyToSubmit) return;

    const response = await createDeadline(caseId, userData.id, formData);

    if (!response.success) {
      return setRequestState({ ...response, status: 'error' });
    }

    resetForm();
    setRequestState({ status: 'ok', data: response.data, message: 'Prazo criado com sucesso!' });
  }

  useEffect(() => {
    checkFields();
  }, [formData]);

  return (
    <form id={formId} onSubmit={handleCreateDeadline} className="flex flex-col gap-[24px]">
      <RequestFeedback requestState={requestState} />
      <div className="flex flex-col min-lg:flex-row gap-[24px]">
        <DropdownInputWithLabel
          id="type-input"
          itemLabel={DeadlineTypeLabel}
          label="Tipo"
          name="type"
          value={formData.type}
          required
          onSelectValue={(value) => updateField('type', value)}
        />
        <DropdownInputWithLabel
          id="countint-type-input"
          itemLabel={DeadlineCountingTypeLabel}
          label="Tipo de Contagem"
          name="countingType"
          value={formData.countingType}
          required
          onSelectValue={(value) => updateField('countingType', value)}
        />
      </div>
      <div className="flex flex-col min-lg:flex-row gap-[24px]">
        <InputWithLabel
          type="date"
          id="intimation-date-input"
          name="intimationDate"
          label="Data de intimação"
          value={formData.intimationDate}
          required
          onChange={(e: any) => updateField('intimationDate', e.target.value)}
        />
        <InputWithLabel
          type="number"
          min={1}
          id="days-input"
          name="days"
          label="Dias"
          value={formData.days}
          required
          onChange={(e: any) => updateField('days', e.target.value)}
        />
      </div>

      <DropdownInputWithLabel
        id="priority-input"
        itemLabel={DeadlinePriorityLabel}
        label="Prioridade"
        name="priority"
        value={formData.priority}
        required
        onSelectValue={(value) => updateField('priority', value)}
      />
    </form>
  );
}
