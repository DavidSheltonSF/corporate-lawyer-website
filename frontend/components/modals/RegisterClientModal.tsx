'use client';
import { Dispatch, FormEvent, FormEventHandler, SetStateAction, useEffect, useState } from 'react';
import { BaseModal } from '../ui/Modal/BaseModal';
import { InputWithLabel } from '../ui/Input/InputWithLabel';
import { Button } from '../ui/Button/Button';
import { createClient } from '@/services/users/createClient';
import { RequestState } from '@/types/RequestState';
import { RequestFeedback } from '../ui/Feedback/RequestFeedback';
import { ButtonVariant } from '../ui/Button/ButtonVariant';
import { WithId } from '@/types/WithId';
import { User } from '@/types/User';
import { handleLogout } from '@/lib/handleLogout';
import { useForm } from '@/hooks/useForm';
interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
export function RegisterClientModal({ isOpen, setIsOpen }: Props) {
  const [requestState, setRequestState] = useState<RequestState<WithId<User>>>({ status: 'idle' });
  const { formState, updateField, clearForm, hasEmptyFields } = useForm({
    firstName: '',
    lastName: '',
    email: '',
    cpf: '',
    phone: '',
  });

  async function registerClient(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = await createClient(formState);
    if (!response.success) {
      setRequestState({ ...response, status: 'error' });
      return;
    }

    clearForm();
    setRequestState({ status: 'ok', data: response.data });
  }

  useEffect(() => {
    if (requestState.status === 'error') {
      if (requestState.code === 'UNAUTHORIZED') {
        handleLogout();
      }
    }
  }, [requestState]);

  const formId = 'create-client-form';

  return (
    isOpen && (
      <BaseModal
        formId={formId}
        className={
          'top-[2%] min-lg:top-[10%] left-1/2 translate-x-[-50%] w-[90%] min-md:w-[678px] h-fit'
        }
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <div className="flex flex-col size-full bg-color-white items-center p-[16px]">
          <div className="flex w-full justify-center items-center text-center font-bold">
            <h2 className="text-2xl">Cadastrar novo cliente</h2>
          </div>
          <div className="flex justify-center items-center h-[40px] w-full"></div>
          <form
            id={formId}
            className="flex flex-col gap-[16px] w-full h-full"
            onSubmit={registerClient}
          >
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
            </div>
            <div className="flex justify-end "></div>
          </form>
        </div>
      </BaseModal>
    )
  );
}
