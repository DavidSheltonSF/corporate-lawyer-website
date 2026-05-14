'use client';
import { WithId } from '@/types/WithId';
import { Activity, useState } from 'react';
import { CardSkeleton } from '../../ui/Card/CardSkeleton';
import { ClientCard } from './ClientCard/ClientCard';
import { SafeUser } from '@/types/SafeUser';
import { CardActionsModal } from '../actions/CardActionsModal';
import { RequestState } from '@/types/RequestState';
import { DeleteClientModal } from '../../modals/DeleteClientModal';
import { UpdateClientModal } from '../../modals/UpdateClientModal';
import { useModal } from '@/hooks/useModal';
import { UserSlice } from '@/types/UserSlice';

interface Props {
  clients: WithId<SafeUser>[];
  loadClients: () => void;
  requestState: RequestState | null;
}

export function ClientsList({ clients, requestState, loadClients }: Props) {
  const [optionsModalIsOpen, setOptionsModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [selectedClientSlice, setSelectedClientSlice] = useState<WithId<UserSlice> | null>(null);
  const { openModal } = useModal();

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
          setSelectedClientSlice(clientIdentity);
        }}
        openClientModal={(clientId: string) => {
          openModal('client', {clientId});
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
      <CardActionsModal
        isOpen={optionsModalIsOpen}
        setIsOpen={setOptionsModalIsOpen}
        openDeleteModal={openDeleteModal}
        openUpdateModal={openUpdateModal}
      />
      <DeleteClientModal
        isOpen={deleteModalIsOpen}
        setIsOpen={setDeleteModalIsOpen}
        selectedClient={selectedClientSlice}
        loadClients={loadClients}
      />
      <UpdateClientModal
        isOpen={updateModalIsOpen}
        setIsOpen={setUpdateModalIsOpen}
        selectedClientId={selectedClientSlice?.id || ''}
        loadClients={loadClients}
      />
      <Activity mode={!isLoading ? 'visible' : 'hidden'}>
        <h1 className="text-3xl">{message}</h1>
      </Activity>
      {isLoading ? renderCaseSkeletons : renderCases}
    </div>
  );
}
