'use client';
import { WithId } from '@/types/WithId';
import { Activity, useState } from 'react';
import { CardSkeleton } from '../../ui/Card/CardSkeleton';
import { ClientCard } from './ClientCard';
import { SafeUser } from '@/types/SafeUser';
import { CardOptionsModal } from '../../modals/CardOptionsModal';
import { RequestState } from '@/types/RequestState';
import { DeleteClientModal } from '../../modals/DeleteClientModal';
import { UpdateClientModal } from '../../modals/UpdateClientModal';
import { ClientModal } from '../../modals/ClientModal';
import { RegisterCaseModal } from '../../modals/RegisterCaseModal';
import { UserIdentity } from '@/types/UserIdentity';

interface Props {
  clients: WithId<SafeUser>[];
  loadClients: () => void;
  requestState: RequestState | null;
}

export function ClientsList({ clients, requestState, loadClients }: Props) {
  const [clientModalIsOpen, setClientModalIsOpen] = useState(false);
  const [registerCaseModalIsOpen, setRegisterCaseModalIsOpen] = useState(false);
  const [optionsModalIsOpen, setOptionsModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<WithId<UserIdentity> | null>(null);

  const renderCases = clients?.map((client, index) => {
    const clientIdentity = {
      id: client.id,
      firstName: client.firstName,
      lastName: client.lastName,
    };
    return (
      <ClientCard
        openOptionsModal={() => {
          setOptionsModalIsOpen(true);
          setSelectedClient(clientIdentity);
        }}
        openClientModal={() => {
          setSelectedClient(clientIdentity);
          setClientModalIsOpen(true);
        }}
        key={index}
        clientData={client}
      />
    );
  });

  const renderCaseSkeletons = Array.from({ length: 4 }).map((page, index) => {
    return <CardSkeleton key={index} />;
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

  function openDeleteModal() {
    setDeleteModalIsOpen(true);
  }
  function openUpdateModal() {
    setUpdateModalIsOpen(true);
  }

  return (
    <div className="flex flex-col gap-[32px] mt-[88px] w-full">
      <ClientModal
        clientId={selectedClient?.id || ''}
        isOpen={clientModalIsOpen}
        setIsOpen={setClientModalIsOpen}
        openRegisterCaseModal={() => {
          setRegisterCaseModalIsOpen(true);
        }}
      />
      <RegisterCaseModal
        selectedClientId={selectedClient?.id || ''}
        isOpen={registerCaseModalIsOpen}
        setIsOpen={setRegisterCaseModalIsOpen}
      />

      <CardOptionsModal
        isOpen={optionsModalIsOpen}
        setIsOpen={setOptionsModalIsOpen}
        openDeleteModal={openDeleteModal}
        openUpdateModal={openUpdateModal}
      />
      <DeleteClientModal
        isOpen={deleteModalIsOpen}
        setIsOpen={setDeleteModalIsOpen}
        selectedClient={selectedClient}
        loadClients={loadClients}
      />
      <UpdateClientModal
        isOpen={updateModalIsOpen}
        setIsOpen={setUpdateModalIsOpen}
        selectedClientId={selectedClient?.id || ''}
        loadClients={loadClients}
      />
      <Activity mode={!isLoading ? 'visible' : 'hidden'}>
        <h1 className="text-3xl">{message}</h1>
      </Activity>
      {isLoading ? renderCaseSkeletons : renderCases}
    </div>
  );
}
