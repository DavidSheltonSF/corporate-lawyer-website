'use client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { BaseModal } from '../../../ui/Modal/BaseModal';
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
import { WithId } from '@/types/WithId';
import { RegisterCaseModal } from '@/components/modals/RegisterCaseModal';
import { GlobalModalProps } from '@/types/GlobalModalProps';

interface Props {
  clientId: string;
}

ClientModal.Header = ClientModalHeader;
ClientModal.Info = ClientModalInfo;
ClientModal.Cases = ClientModalCases;

export function ClientModal({ payload, close }: GlobalModalProps<Props>) {
  const [registerCaseModalIsOpen, setRegisterCaseModalIsOpen] = useState(false);
  const [requestState, setRequestState] = useState<
    RequestState<SafeUser & { cases: WithId<Case>[] }>
  >({ status: 'idle' });
  const isLoading = requestState?.status === 'loading';
  const error = requestState?.status === 'error';
  const { clientId } = payload;

  useEffect(() => {
    async function fetchClientData() {
      const response = await getClientWithCases(clientId);

      if (!response.success) {
        setRequestState({ ...response, status: 'error' });
        return;
      }

      setRequestState({ status: 'ok', data: response.data });
    }

    fetchClientData();
    return () => {
      setRequestState({ status: 'idle' });
    };
  }, []);

  if (registerCaseModalIsOpen) {
    return (
      <RegisterCaseModal
        clientId={clientId}
        isOpen={registerCaseModalIsOpen}
        close={() => {
          setRegisterCaseModalIsOpen(false);
        }}
      />
    );
  }

  function renderContent() {
    switch (requestState.status) {
      case 'loading':
        return <CaseModalSkeleton />;

      case 'ok':
        const { data } = requestState;
        return (
          <div className="flex flex-col size-full">
            <ClientModal.Header
              firstName={data.firstName}
              lastName={data.lastName}
              cpf={data.cpf}
            />
            <ClientModal.Info clientData={data} />
            <ClientModal.Cases
              cases={data.cases}
              openRegisterCaseModal={() => {
                setRegisterCaseModalIsOpen(true);
              }}
            />
          </div>
        );

      case 'error':
        return (
          <div className="flex flex-col items-center size-ful pt-[80px] px-[24px] text-center gap-[16px]">
            <h1>Cliente não encontrado</h1>
            <h3>O cliente procurado foi removido do sistema ou não existe</h3>
          </div>
        );

      default:
        break;
    }
  }

  return (
    <BaseModal
      className={'top-[2%] left-1/2 translate-x-[-50%] w-[90%] min-lg:w-[880px] h-[90%]'}
      onClose={close}
    >
      {renderContent()}
    </BaseModal>
  );
}
