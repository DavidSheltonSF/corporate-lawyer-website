'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import { PrimaryModal } from '../ui/Modal/PrimaryModal';
import { InputWithLabel } from '../ui/Input/InputWithLabel';
import { Button } from '../ui/Button/Button';
import { createClient } from '@/services/users/createClient';
import { RequestState } from '@/types/RequestState';
import { RequestFeedback } from '../ui/Feedback/RequestFeedback';
import { handleLogout } from '@/lib/handleLogout';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { ButtonVariant } from '../ui/Button/ButtonVariant';
interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
export function RegisterClientModal({ isOpen, setIsOpen }: Props) {
  const [requestState, setRequestState] = useState<RequestState | null>(null);

  async function registerClient(formData: FormData) {
    try {
      const data = await createClient(formData);
      setRequestState({
        status: 'ok',
        message: `Cliente registrado com sucesso. Senha: ${data.password}`,
      });
    } catch (error: any) {
      console.log(error);
      setRequestState({ status: 'error', message: error.message });
      if (error instanceof UnauthorizedError) {
        handleLogout();
      }
    }
  }

  return (
    isOpen && (
      <PrimaryModal
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
          <div className="flex justify-center items-center h-[40px] w-full">
            <RequestFeedback requestState={requestState} />
          </div>
          <form className="flex flex-col gap-[16px] w-full h-full" action={registerClient}>
            <div className="flex flex-col gap-[16px] min-lg:flex-row w-full">
              <InputWithLabel id="first-name-input" name="firstName" label="Nome" />
              <InputWithLabel id="last-name-input" name="lastName" label="Sobrenome" />
            </div>
            <div className="flex flex-col gap-[16px] min-lg:flex-row w-full">
              <InputWithLabel id="email-input" name="email" label="Email" />
              <InputWithLabel id="cpf-input" name="cpf" label="CPF" />
            </div>
            <div className="flex justify-end "></div>
            <Button variant={ButtonVariant.PRIMARY} className="w-full min-md:w-fit min-md:ml-auto">
              Salvar
            </Button>
          </form>
        </div>
      </PrimaryModal>
    )
  );
}
