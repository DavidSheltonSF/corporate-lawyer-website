'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import { PrimaryModalWindow } from './PrimaryModalWindow';
import { InputWithLabel } from '../form/InputWithLabel';
import { Button } from '../Button';
import { createClient } from '@/services/createClient';
import { RequestState } from '@/types/RequestState';
import { RequestFeedback } from '../form/RequestFeedback';
interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
export function RegisterUserModal({ isOpen, setIsOpen }: Props) {
  const [requestState, setRequestState] = useState<RequestState | null>(null);

  async function registerClient(formData: FormData) {
    try {
      const result = await createClient(formData);
      setRequestState({ status: 'ok', message: 'Cliente registrado com sucesso' });
    } catch (error: any) {
      console.log(error);
      setRequestState({ status: 'error', message: error.message });
    }
  }

  return (
    isOpen && (
      <PrimaryModalWindow
        additionalStyles={
          'fixed z-99999999999 top-[2%] left-1/2 translate-x-[-50%] w-[90%] min-lg:w-[880px] h-[70vh] min-lg:h-[70vh] rounded-lg overflow-hidden shadow-[0px_0px__3px_black] text-color-black'
        }
        closeModal={() => {
          setIsOpen(false);
        }}
      >
        <div className="flex flex-col size-full bg-color-white items-center p-[16px]">
          <div className="flex justify-center items-center h-[40px] w-full">
            <RequestFeedback requestState={requestState} />
          </div>
          <form className="flex flex-col gap-[16px] w-full" action={registerClient}>
            <InputWithLabel id="first-name-input" name="firstName" label="Nome" />
            <InputWithLabel id="last-name-input" name="lastName" label="Sobrenome" />
            <InputWithLabel id="email-input" name="email" label="Email" />
            <InputWithLabel id="cpf-input" name="cpf" label="CPF" />
            <Button
              paddingY="8px"
              backgroundColor="var(--primary-color)"
              textColor="var(--white-color)"
              fontSize="1.2rem"
            >
              Cadastrar Cliente
            </Button>
          </form>
        </div>
      </PrimaryModalWindow>
    )
  );
}
