import { useCurrentUserId } from '@/hooks/auth/useCurrentUserId';
import { DropdownInputWithLabel } from '../ui/Input/DropdownInputWithLabel';
import { InputWithLabel } from '../ui/Input/InputWithLabel';
import { RequestState } from '@/types/RequestState';
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';
import { createCase } from '@/services/cases/createCase';
import { useForm } from '@/hooks/useForm';
import { WithId } from '@/types/WithId';
import { RequestFeedback } from '../ui/Feedback/RequestFeedback';
import { handleLogout } from '@/lib/handleLogout';
import { SafeUser } from '@/types/SafeUser';
import { updateUser } from '@/services/users/updateUser';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { getUserById } from '@/services/users/getUserById';
import { LoadingModalScreeen } from '../ui/Modal/LoadingModalScreen';
import { error } from 'console';

interface Props {
  formId: string;
  // isReadyToSubmit: boolean;
  // setIsReadyToSubmit: Dispatch<SetStateAction<boolean>>;
  clientId: string;
}

export function UpdateClientModalForm({
  formId,
  // isReadyToSubmit,
  // setIsReadyToSubmit,
  clientId,
}: Props) {
  const [getRequestState, setGetRequestState] = useState<RequestState<WithId<SafeUser>>>({
    status: 'idle',
  });
  const [updateRequestState, setUpdateRequestState] = useState<RequestState<WithId<SafeUser>>>({
    status: 'idle',
  });
  const { formState, setFormState, clearForm, hasEmptyFields, updateField } = useForm({
    firstName: '',
    lastName: '',
    cpf: '',
    email: '',
    phone: '',
  });

  const userId = useCurrentUserId();

  async function handleGetUser() {
    setGetRequestState({ status: 'loading' });
    const response = await getUserById(clientId);

    if (!response.success) {
      setGetRequestState({ ...response, status: 'error' });
      return;
    }

    const { data } = response;

    setFormState({
      firstName: data.firstName,
      lastName: data.lastName,
      cpf: data.cpf,
      email: data.email,
      phone: data.phone,
    });

    setGetRequestState({ status: 'ok', data: response.data });
  }

  async function handleUpdateClient(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUpdateRequestState({ status: 'loading' });

    const response = await updateUser(clientId, formState);

    if (!response.success) {
      setUpdateRequestState({ ...response, status: 'error' });
      return;
    }

    setUpdateRequestState({ status: 'ok', data: response.data });
  }

  useEffect(() => {
    handleGetUser();

    return () => {
      setGetRequestState({ status: 'idle' });
      setUpdateRequestState({ status: 'idle' });
    };
  }, []);

  // function checkFields() {
  //   setIsReadyToSubmit(!hasEmptyFields());
  // }

  // useEffect(() => {
  //   checkFields();
  // }, [formState]);

  // useEffect(() => {
  //   if (requestState.status === 'error') {
  //     if (requestState.code === 'UNAUTHORIZED') {
  //       handleLogout();
  //     }
  //   }
  // }, [requestState]);

  switch (getRequestState.status) {
    case 'loading':
      return <LoadingModalScreeen />;

    case 'ok':
      return (
        <form id={formId} className="flex flex-col gap-[16px] w-ful]" onSubmit={handleUpdateClient}>
          <RequestFeedback requestState={updateRequestState} />
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
            <InputWithLabel id="cpf-input" name="cpf" label="CPF" defaultValue={formState.cpf} />
            <InputWithLabel
              id="phone-input"
              name="phone"
              label="Telefone"
              value={formState.phone}
              onChange={(e) => updateField('phone', e.target.value)}
            />
          </div>
        </form>
      );

    case 'error':
      return <h3>{getRequestState.message}</h3>;

    default:
      return null;
  }
}
