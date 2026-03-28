'use client';
import { WithId } from '@/types/WithId';
import { Activity, useState } from 'react';
import { CaseCardSkeleton } from './CaseCardSkeleton';
import { ClientCard } from './ClientCard';
import { SafeUser } from '@/types/SafeUser';
import { ClientCardOptionsModal } from './modals/ClientCardOptionsModal';
import { RequestState } from '@/types/RequestState';
import { DeleteClientModal } from './modals/DeleteClientModal';
import { ClientCardModalsProvider } from '@/contexts/modals/ClientCardModalsProvider';
import { UpdateClientModal } from './modals/UpdateClientModal';
import { ClientModal } from './modals/ClientModal';
import { RegisterCaseModal } from './modals/RegisterCaseModal';

interface Props {
  clients: WithId<SafeUser>[];
  loadClients: () => void;
  requestState: RequestState | null;
}

export function ClientsList({ clients, requestState, loadClients }: Props) {
  const [clientModalIsOpen, setClientModalIsOpen] = useState(false);
  const [registerCaseModalIsOpen, setRegisterCaseModalIsOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);

  const renderCases = clients?.map((client, index) => {
    return (
      <ClientCard
        openClientModal={(clientId: string) => {
          setSelectedClient(clientId);
          setClientModalIsOpen(true);
        }}
        key={index}
        clientData={client}
      />
    );
  });

  const renderCaseSkeletons = Array.from({ length: 4 }).map((page, index) => {
    return <CaseCardSkeleton key={index} />;
  });

  let message = '';

  const errorMessage = requestState?.status === 'error' ? requestState.message : null;
  if (errorMessage) {
    message = errorMessage;
  }

  const noClients = clients.length === 0;
  if (!errorMessage && noClients) {
    message = 'Nenhum cliente encontrado';
  }

  const isLoading = requestState?.status === 'loading';

  return (
    <div className="flex flex-col gap-[32px] mt-[88px] w-full">
      <ClientModal
        clientId={selectedClient}
        isOpen={clientModalIsOpen}
        setIsOpen={setClientModalIsOpen}
        openRegisterCaseModal={() => {
          setRegisterCaseModalIsOpen(true);
        }}
      />
      <RegisterCaseModal
        selectedClientId={selectedClient}
        isOpen={registerCaseModalIsOpen}
        setIsOpen={setRegisterCaseModalIsOpen}
      />
      <ClientCardModalsProvider>
        <ClientCardOptionsModal />
        <DeleteClientModal loadClients={loadClients} />
        <UpdateClientModal loadClients={loadClients} />
        <Activity mode={!isLoading ? 'visible' : 'hidden'}>
          <h1 className="text-3xl">{message}</h1>
        </Activity>
        {isLoading ? renderCaseSkeletons : renderCases}
      </ClientCardModalsProvider>
    </div>
  );
}
