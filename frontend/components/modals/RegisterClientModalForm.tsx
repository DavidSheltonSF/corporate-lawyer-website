import { RequestState } from '@/types/RequestState';
import { RequestFeedback } from '../ui/Feedback/RequestFeedback';
import { InputWithLabel } from '../ui/Input/InputWithLabel';
import { WithId } from '@/types/WithId';
import { User } from '@/types/User';
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';
import { useForm } from '@/hooks/useForm';
import { createClient } from '@/services/users/createClient';
import { handleLogout } from '@/lib/handleLogout';

interface Props {
  formId: string;
  isReadyToSubmit: boolean;
  setIsReadyToSubmit: Dispatch<SetStateAction<boolean>>;
}

export function RegisterClientModalForm({ formId, isReadyToSubmit, setIsReadyToSubmit }: Props) {
  const [requestState, setRequestState] = useState<RequestState<WithId<User>>>({ status: 'idle' });
  const { formState, updateField, clearForm, hasEmptyFields } = useForm({
    firstName: '',
    lastName: '',
    email: '',
    cpf: '',
    phone: '',
  });

  async function registerClient(e: FormEvent<HTMLFormElement>) {
    if (!isReadyToSubmit) return;

    e.preventDefault();

    const response = await createClient(formState);
    if (!response.success) {
      setRequestState({ ...response, status: 'error' });
      return;
    }

    clearForm();
    setRequestState({ status: 'ok', data: response.data });
  }

  function checkFields() {
    setIsReadyToSubmit(!hasEmptyFields());
  }

  useEffect(() => {
    if (requestState.status === 'error') {
      if (requestState.code === 'UNAUTHORIZED') {
        handleLogout();
      }
    }
  }, [requestState]);

  useEffect(() => {
    checkFields();
  }, [formState]);

  return (
    <form id={formId} className="flex flex-col gap-[16px] w-full h-full" onSubmit={registerClient}>
      <RequestFeedback requestState={requestState} />
      <div className="flex flex-col gap-[16px] min-lg:flex-row w-full">
        <InputWithLabel
          id="first-name-input"
          name="firstName"
          label="Nome"
          value={formState.firstName}
          onChange={(e) => updateField('firstName', e.target.value)}
        />
        <InputWithLabel
          id="last-name-input"
          name="lastName"
          label="Sobrenome"
          value={formState.lastName}
          onChange={(e) => updateField('lastName', e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-[16px] min-lg:flex-row w-full">
        <InputWithLabel
          id="email-input"
          name="email"
          label="Email"
          value={formState.email}
          onChange={(e) => updateField('email', e.target.value)}
        />
        <InputWithLabel
          id="cpf-input"
          name="cpf"
          label="CPF"
          value={formState.cpf}
          onChange={(e) => updateField('cpf', e.target.value)}
        />
        <InputWithLabel
          id="cpf-input"
          name="phone"
          label="Telefone"
          value={formState.phone}
          onChange={(e) => updateField('phone', e.target.value)}
        />
      </div>
    </form>
  );
}
