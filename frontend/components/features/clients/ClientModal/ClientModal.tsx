'use client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PrimaryModal } from '../../../ui/Modal/PrimaryModal';
import { FieldValue } from '../../../FieldValue';
import { CaseModalSkeleton } from '../../cases/CaseModal/CaseModalSkeleton';
import { SafeUser } from '@/types/SafeUser';
import { getClientWithCases } from '@/services/users/getClientWithCases';
import { Case } from '@/types/Case';
import { handleLogout } from '@/lib/handleLogout';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { ClientModalHeader } from './ClientModalHeader';
import { ClientModalInfo } from './ClientModalInfo';
import { ClientModalCases } from './ClientModalCases';
import { RequestState } from '@/types/RequestState';
import { CardSkeleton } from '@/components/ui/Card/CardSkeleton';

interface Props {
  clientId: string | null;
  isOpen: boolean;
  close: () => void;
  openRegisterCaseModal: () => void;
}

ClientModal.Header = ClientModalHeader;
ClientModal.Info = ClientModalInfo;
ClientModal.Cases = ClientModalCases;

export function ClientModal({ isOpen, close, clientId, openRegisterCaseModal }: Props) {
  const [clientData, setClientData] = useState<(SafeUser & { cases: Case[] }) | null>(null);
  const [requestState, setRequestState] = useState<RequestState | null>(null);
  const isLoading = requestState?.status === 'loading';
  const error = requestState?.status === 'error';

  useEffect(() => {
    async function fetchClientData() {
      try {
        if (!isOpen || !clientId) return;
        setRequestState({ status: 'loading' });
        const clientFound = await getClientWithCases(clientId);
        setClientData(clientFound);
        setRequestState({ status: 'ok' });
      } catch (error: any) {
        console.log(error);
        setRequestState({ status: 'error', message: error.message });

        if (error instanceof UnauthorizedError) {
          handleLogout();
        }
      }
    }

    function cleanClientDataOnClose() {
      if (isOpen) return;
      setClientData(null);
    }

    function resetStates() {
      setClientData(null);
      close;
    }

    fetchClientData();
    cleanClientDataOnClose();

    return () => {
      resetStates;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  function renderContent() {
    if (isLoading) {
      return <CaseModalSkeleton />;
    }

    if (error || !clientData) {
      return (
        <div className="flex flex-col items-center size-ful pt-[80px] px-[24px] text-center gap-[16px]">
          <h1>Cliente não encontrado</h1>
          <h3>O cliente procurado foi removido do sistema ou não existe</h3>
        </div>
      );
    }

    return (
      <div className="flex flex-col size-full">
        <ClientModal.Header firstName={clientData.firstName} lastName={clientData.lastName} cpf={clientData.cpf}/>
        <ClientModal.Info clientData={clientData} />
        <ClientModal.Cases cases={clientData.cases} openRegisterCaseModal={openRegisterCaseModal} />
      </div>
    );
  }

  return (
    <PrimaryModal
      additionalStyles={
        'fixed z-99999999999 top-[2%] left-1/2 translate-x-[-50%] w-[90%] min-lg:w-[880px] h-[90%] rounded-lg overflow-hidden shadow-[0px_0px__3px_black] text-color-black'
      }
      closeModal={close}
    >
      {renderContent()}
    </PrimaryModal>
  );
}
