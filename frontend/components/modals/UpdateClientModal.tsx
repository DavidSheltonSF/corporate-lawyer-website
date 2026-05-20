'use client';
import { useEffect, useState } from 'react';
import { BaseModal } from '../ui/Modal/BaseModal';
import { InputWithLabel } from '../ui/Input/InputWithLabel';
import { RequestState } from '@/types/RequestState';
import { RequestFeedback } from '../ui/Feedback/RequestFeedback';
import { updateUser } from '@/services/users/updateUser';
import { getUserById } from '@/services/users/getUserById';
import { SafeUser } from '@/types/SafeUser';
import { handleLogout } from '@/lib/handleLogout';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { ShowSkeletonOnLoading } from '../ui/ShowSkeletonOnLoading';
import { LoadingModalScreeen } from '../ui/Modal/LoadingModalScreen';

interface Props {
  data: { clientId: string; loadClients: () => void };
  close: () => void;
}

export function UpdateClientModal({ data, close }: Props) {
  const [clientData, setClientData] = useState<SafeUser | null>(null);
  const [requestState, setRequestState] = useState<RequestState | null>(null);
  const { clientId, loadClients } = data;

  async function getUser() {
    try {
      setRequestState({ status: 'loading' });
      const data = await getUserById(clientId);
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
      const data = await updateUser(clientId, formData);
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
    getUser();

    return () => {
      setRequestState(null);
      setClientData(null);
    };
  }, []);

  const isLoading = requestState?.status === 'loading';
  const formId = 'update-client-form';
  return (
    <BaseModal
      formId={formId}
      title="Editar cliente"
      className={
        'top-[2%] min-lg:top-[10%] left-1/2 translate-x-[-50%] w-[90%] min-lg:w-[678px] h-fit'
      }
      onClose={close}
    >
      <ShowSkeletonOnLoading isLoading={isLoading} Skeleton={LoadingModalScreeen}>
        <div className="flex flex-col size-full items-center p-[16px]">
          <div className="flex justify-center items-center h-[40px] w-full">
            <RequestFeedback requestState={requestState} />
          </div>
          <form id={formId} className="flex flex-col gap-[16px] w-full h-full" action={alterClient}>
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
              <InputWithLabel
                id="phone-input"
                name="phone"
                label="Telefone"
                defaultValue={clientData?.phone}
              />
            </div>
          </form>
        </div>
      </ShowSkeletonOnLoading>
    </BaseModal>
  );
}
