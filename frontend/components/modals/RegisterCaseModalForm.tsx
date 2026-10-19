import { useCurrentUserId } from '@/hooks/auth/useCurrentUserId';
import { DropdownInputWithLabel } from '../ui/Input/DropdownInputWithLabel';
import { InputWithLabel } from '../ui/Input/InputWithLabel';
import { RequestState } from '@/types/RequestState';
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';
import { createCase } from '@/services/cases/createCase';
import { useForm } from '@/hooks/useForm';
import { WithId } from '@/types/WithId';
import { Case } from '@/types/Case';
import { CaseStatusLabel } from '@/lib/CaseStatusLabel';
import { BrazilStateLabel } from '@/lib/BrazilStateLabel';
import { CityLabel } from '@/lib/CityLabel';
import { RequestFeedback } from '../ui/Feedback/RequestFeedback';
import { handleLogout } from '@/lib/handleLogout';
import { getClientByEmail } from '@/services/users/getClientByEmail';
import { User } from '@/types/User';

interface Props {
  formId: string;
  isReadyToSubmit: boolean;
  setIsReadyToSubmit: Dispatch<SetStateAction<boolean>>;
}

export function RegisterCaseModalForm({ formId, isReadyToSubmit, setIsReadyToSubmit }: Props) {
  const [requestState, setRequestState] = useState<RequestState<WithId<Case>>>({ status: 'idle' });
  const [findClientRequest, setFindClientRequest] = useState<RequestState<WithId<User>>>({
    status: 'idle',
  });
  const { formState, clearForm, hasEmptyFields, updateField } = useForm({
    clientEmail: '',
    title: '',
    caseNumber: '',
    court: '',
    courtDivision: '',
    status: '',
    state: '',
    city: '',
    description: '',
  });
  const [clientId, setClientId] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);

  const userId = useCurrentUserId();

  async function registerCase(e: FormEvent<HTMLFormElement>) {
    if (!isReadyToSubmit) return;
    if (!userId) {
      throw Error('User id was not provided');
    }

    e.preventDefault();
    setRequestState({ status: 'loading' });

    const response = await createCase(clientId || '', userId, formState);

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

  function checkFields() {
    setIsReadyToSubmit(!hasEmptyFields());
  }

  useEffect(() => {
    checkFields();
  }, [formState]);

  useEffect(() => {
    if (requestState.status === 'error') {
      if (requestState.code === 'UNAUTHORIZED') {
        handleLogout();
      }
    }
  }, [requestState]);

  function validateEmail(email: string) {
    if (/^[^\s@]+@[^\s@]+\.com+$/.test(email)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  }

  useEffect(() => {
    async function handleFindClient() {
      const response = await getClientByEmail(formState.clientEmail);

      if (!response.success) {
        setFindClientRequest({
          status: 'error',
          message: 'Client not found',
        });
        return;
      }

      setFindClientRequest({ status: 'ok', data: response.data, message: 'Client Found' });
      const user = response.data;
      setClientId(user.id);
    }

    if (isEmailValid) {
      handleFindClient();
    }
  }, [formState.clientEmail]);

  return (
    <form id={formId} className="flex flex-col gap-[16px] w-ful]" onSubmit={registerCase}>
      <RequestFeedback requestState={requestState} />
      <div className="flex flex-col">
        <InputWithLabel
          id="client-email-input"
          name="client-email"
          label="Email do cliente"
          value={formState.clientEmail}
          type="email"
          className={formState.clientEmail && !isEmailValid ? 'border-red-500' : ''}
          placeholder="example@email.com"
          onChange={(e) => {
            updateField('clientEmail', e.target.value);
            validateEmail(e.target.value);
          }}
        />
        <span
          className={
            findClientRequest.status === 'ok'
              ? 'text-green-500 font-bold'
              : 'text-red-500 font-bold'
          }
        >
          {findClientRequest.status !== 'idle' && findClientRequest.status !== 'loading'
            ? findClientRequest.message
            : ''}
        </span>
      </div>
      <div className="flex flex-col gap-[16px] min-lg:flex-row w-full">
        <InputWithLabel
          disabled={!clientId}
          id="title-input"
          name="title"
          label="Título"
          value={formState.title}
          onChange={(e) => updateField('title', e.target.value)}
        />
        <InputWithLabel
          disabled={!clientId}
          id="process-number-input"
          name="caseNumber"
          label="Número do Processo"
          value={formState.caseNumber}
          onChange={(e) => updateField('caseNumber', e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-[16px] min-lg:flex-row w-full">
        <InputWithLabel
          disabled={!clientId}
          id="court-input"
          name="court"
          label="Tribunal"
          value={formState.court}
          onChange={(e) => updateField('court', e.target.value)}
        />
        <InputWithLabel
          disabled={!clientId}
          id="court-division-input"
          name="courtDivision"
          label="Vara"
          value={formState.courtDivision}
          onChange={(e) => updateField('courtDivision', e.target.value)}
        />
        <DropdownInputWithLabel
          disabled={!clientId}
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
          disabled={!clientId}
          id="estado-input"
          name="state"
          label="Estado"
          itemLabel={BrazilStateLabel}
          value={formState.state}
          setSelectedValue={(value) => updateField('state', value)}
        />
        <DropdownInputWithLabel
          disabled={!clientId}
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
          disabled={!clientId}
          id="description-input"
          name="description"
          label="Description"
          value={formState.description}
          onChange={(e) => updateField('description', e.target.value)}
        />
      </div>
    </form>
  );
}
