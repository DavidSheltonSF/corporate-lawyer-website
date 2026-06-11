'use client';
import { useEffect, useState } from 'react';
import { BaseModal } from '../../../ui/Modal/BaseModal';
import { CaseModalSkeleton } from '../../cases/CaseModal/CaseModalSkeleton';
import { SafeUser } from '@/types/SafeUser';
import { getClientWithCases } from '@/services/users/getClientWithCases';
import { Case } from '@/types/Case';
import { ClientModalHeader } from './ClientModalHeader';
import { ClientModalInfo } from './ClientModalInfo';
import { RequestState } from '@/types/RequestState';
import { WithId } from '@/types/WithId';
import { RegisterCaseModal } from '@/components/modals/RegisterCaseModal';
import { GlobalModalProps } from '@/types/GlobalModalProps';
import { ClientModalFooter } from './ClientModalFooter';
import { useClientCasesModal } from '@/hooks/modals/useClientCasesModal';
import { Button } from '@/components/ui/Button/Button';
import { ButtonVariant } from '@/components/ui/Button/ButtonVariant';
import { OpenUploadModalButton } from '@/components/OpenUploadModalButton';
import { LoadingModalScreeen } from '@/components/ui/Modal/LoadingModalScreen';

interface Props {
  clientId: string;
}

ClientModal.Header = ClientModalHeader;
ClientModal.Info = ClientModalInfo;
ClientModal.Footer = ClientModalFooter;

export function ClientModal({ payload, close }: GlobalModalProps<Props>) {
  const [registerCaseModalIsOpen, setRegisterCaseModalIsOpen] = useState(false);
  const [requestState, setRequestState] = useState<
    RequestState<SafeUser & { cases: WithId<Case>[] }>
  >({ status: 'idle' });
  const { openClientCasesModal } = useClientCasesModal();
  const isLoading = requestState?.status === 'loading';
  const error = requestState?.status === 'error';
  const { clientId } = payload;

  useEffect(() => {
    async function fetchClientData() {
      setRequestState({ status: 'loading' });

      const response = await getClientWithCases(clientId);

      if (!response.success) {
        setRequestState({ ...response, status: 'error' });
        return;
      }

      setRequestState({ status: 'ok', data: response.data });
    }

    fetchClientData();
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
        return <LoadingModalScreeen />;

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
            <Button
              onClick={() => openClientCasesModal(clientId)}
              variant={ButtonVariant.SECONDARY}
            >
              Ver processos
            </Button>
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
      omitFooter={true}
      className={
        'top-[2%] left-1/2 translate-x-[-50%] min-w-[90%] md:min-w-[60%] lg:min-w-[400px] min-h-[40vh]'
      }
      onClose={close}
    >
      {renderContent()}
    </BaseModal>
  );
}
