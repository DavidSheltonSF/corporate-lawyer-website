'use client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PrimaryModalWindow } from './PrimaryModalWindow';
import { InputWithLabel } from '../form/InputWithLabel';
import { Button } from '../Button';
import { RequestState } from '@/types/RequestState';
import { RequestFeedback } from '../form/RequestFeedback';
import { updateUser } from '@/services/users/updateUser';
import { getUserById } from '@/services/users/getUserById';
import { SafeUser } from '@/types/SafeUser';
import { handleLogout } from '@/lib/handleLogout';
import { UnauthorizedError } from '@/errors/UnauthorizedError';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedClientId: string;
  loadClients: Function;
}

export function UpdateClientModal({ loadClients, isOpen, setIsOpen, selectedClientId }: Props) {
  const [clientData, setClientData] = useState<SafeUser | null>(null);
  const [requestState, setRequestState] = useState<RequestState | null>(null);

  async function getUser() {
    try {
      const data = await getUserById(selectedClientId || '');
      setClientData(data);
      setRequestState({
        status: 'ok',
        message: `Cliente carregado com sucesso.`,
      });
    } catch (error: any) {
      console.log(error);
      setRequestState({ status: 'error', message: error.message });
      if (error instanceof UnauthorizedError) {
        handleLogout();
      }
    }
  }

  async function alterClient(formData: FormData) {
    try {
      const data = await updateUser(selectedClientId || '', formData);
      setRequestState({
        status: 'ok',
        message: `Cliente atualizado com sucesso.`,
      });
      setClientData(data);
      loadClients();
    } catch (error: any) {
      console.log(error);
      setRequestState({ status: 'error', message: error.message });
      if (error instanceof UnauthorizedError) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (!isOpen) return;
    getUser();

    return () => {
      setRequestState(null);
      setClientData(null);
    };
  }, [isOpen]);

  return (
    isOpen && (
      <PrimaryModalWindow
        additionalStyles={
          'fixed z-99999999999 top-[2%] min-lg:top-[10%] left-1/2 translate-x-[-50%] w-[90%] min-lg:w-[678px] h-fit rounded-lg overflow-hidden shadow-[0px_0px__3px_black] text-color-black'
        }
        closeModal={() => {
          setRequestState(null);
          setClientData(null);
          setIsOpen(false);
        }}
      >
        <div className="flex flex-col size-full bg-color-white items-center p-[16px]">
          <div className="flex justify-center items-center h-[40px] w-full">
            <RequestFeedback requestState={requestState} />
          </div>
          <form className="flex flex-col gap-[16px] w-full h-full" action={alterClient}>
            <div className="flex flex-col gap-[16px] min-lg:flex-row w-full">
              <InputWithLabel
                id="first-name-input"
                name="firstName"
                label="Nome"
                defaultValue={clientData?.firstName}
              />
              <InputWithLabel
                id="last-name-input"
                name="lastName"
                label="Sobrenome"
                defaultValue={clientData?.lastName}
              />
            </div>
            <div className="flex flex-col gap-[16px] min-lg:flex-row w-full">
              <InputWithLabel
                id="email-input"
                name="email"
                label="Email"
                defaultValue={clientData?.email}
              />
              <InputWithLabel
                id="cpf-input"
                name="cpf"
                label="CPF"
                defaultValue={clientData?.cpf}
              />
            </div>

            <div className="flex justify-end w-full bg-black min-md:w-[200px]  min-md:ml-auto">
              <Button
                width="100%"
                backgroundColor="var(--primary-color)"
                textColor="var(--white-color)"
                fontSize="1.2rem"
              >
                Confirmar Alterações
              </Button>
            </div>
          </form>
        </div>
      </PrimaryModalWindow>
    )
  );
}
