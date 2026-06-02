import { useCurrentUserId } from '@/hooks/auth/useCurrentUserId';
import { DropdownInputWithLabel } from '../ui/Input/DropdownInputWithLabel';
import { InputWithLabel } from '../ui/Input/InputWithLabel';
import { RequestState } from '@/types/RequestState';
import { useState } from 'react';
import { createCase } from '@/services/cases/createCase';
import { useForm } from '@/hooks/useForm';
import { WithId } from '@/types/WithId';
import { Case } from '@/types/Case';
import { CaseStatusLabel } from '@/lib/CaseStatusLabel';
import { BrazilStateLabel } from '@/lib/BrazilStateLabel';
import { CityLabel } from '@/lib/CityLabel';
import { RequestFeedback } from '../ui/Feedback/RequestFeedback';

interface Props {
  formId: string;
  clientId: string;
}

export function RegisterCaseModalForm({ formId, clientId }: Props) {
  const [requestState, setRequestState] = useState<RequestState<WithId<Case>>>({ status: 'idle' });
  const { formState, clearForm, hasEmptyFields, updateField } = useForm({
    title: '',
    processNumber: '',
    court: '',
    courtDivision: '',
    status: '',
    state: '',
    city: '',
    description: '',
  });

  const userId = useCurrentUserId();

  async function registerCase(formData: FormData) {
    const response = await createCase(clientId || '', userId, formData);

    if (!response.success) {
      setRequestState({ ...response, status: 'error' });
      return;
    }

    setRequestState({
      status: 'ok',
      data: response.data,
      message: `Processo criado com sucesso`,
    });
  }

  switch (requestState.status) {
    case 'idle':
    case 'ok':
      return (
        <div className="flex flex-col overflow-y-auto p-[24px] h-[56vh]">
          <RequestFeedback requestState={requestState} />
          <form id={formId} className="flex flex-col gap-[16px] w-ful]" action={registerCase}>
            <div className="flex flex-col gap-[16px] min-lg:flex-row w-full">
              <InputWithLabel
                id="title-input"
                name="title"
                label="Título"
                value={formState.title}
                onChange={(e) => updateField('title', e.target.value)}
              />
              <InputWithLabel
                id="process-number-input"
                name="processNumber"
                label="Número do Processo"
                value={formState.processNumber}
                onChange={(e) => updateField('processNumber', e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-[16px] min-lg:flex-row w-full">
              <InputWithLabel
                id="court-input"
                name="court"
                label="Tribunal"
                value={formState.court}
                onChange={(e) => updateField('court', e.target.value)}
              />
              <InputWithLabel
                id="court-division-input"
                name="courtDivision"
                label="Vara"
                value={formState.courtDivision}
                onChange={(e) => updateField('courtDivision', e.target.value)}
              />
              <DropdownInputWithLabel
                id="status-input"
                name="status"
                label="Status"
                itemLabel={CaseStatusLabel}
                value={formState.status}
                setSelectedValue={(value) => updateField('status', value)}
              />
            </div>
            <div className="flex flex-col gap-[16px] min-lg:flex-row w-full">
              <DropdownInputWithLabel
                id="estado-input"
                name="state"
                label="Estado"
                itemLabel={BrazilStateLabel}
                value={formState.state}
                setSelectedValue={(value) => updateField('state', value)}
              />
              <DropdownInputWithLabel
                id="city-input"
                name="city"
                label="Cidade"
                itemLabel={CityLabel}
                value={formState.city}
                setSelectedValue={(value) => updateField('city', value)}
              />
            </div>
            <div>
              <InputWithLabel
                id="description-input"
                name="description"
                label="Description"
                value={formState.description}
                onChange={(e) => updateField('description', e.target.value)}
              />
            </div>
          </form>
        </div>
      );

    default:
      return null;
  }
}
