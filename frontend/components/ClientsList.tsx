'use client';
import { WithId } from '@/types/WithId';
import { Activity, useState } from 'react';
import { CaseCardSkeleton } from './CaseCardSkeleton';
import { ClientCard } from './ClientCard';
import { SafeUser } from '@/types/SafeUser';
import { ClientCardOptionsModal } from './modals/ClientCardOptionsModal';
import { RequestState } from '@/types/RequestState';
import { error } from 'console';

interface Props {
  clients: WithId<SafeUser>[];
  requestState: RequestState | null;
}

export function ClientsList({ clients, requestState }: Props) {
  const [optionsModalIsOpen, setOptionsModalIsOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const openOptionsModal = (id: string) => {
    setSelectedUserId(id);
    setOptionsModalIsOpen(true);
  };

  const closeOptionsModal = () => {
    setSelectedUserId(null);
    setOptionsModalIsOpen(false);
  };

  const renderCases = clients?.map((client, index) => {
    return <ClientCard openOptionsModal={openOptionsModal} key={index} clientData={client} />;
  });

  const renderCaseSkeletons = Array.from({ length: 4 }).map((page, index) => {
    return <CaseCardSkeleton key={index} />;
  });

  let message = '';

  const errorMessage = requestState?.status === 'error' ? requestState.message : null;
  if (errorMessage) {
    message = errorMessage;
  }

  const noClients = !clients || clients.length === 0;
  if (noClients) {
    message = 'Nenhum cliente encontrado';
  }

  const isLoading = requestState?.status === 'loading';

  return (
    <div className="flex flex-col gap-[32px] mt-[88px] w-full">
      <ClientCardOptionsModal
        isOpen={optionsModalIsOpen}
        closeModal={closeOptionsModal}
        selectedUserId={selectedUserId}
      />
      <Activity mode={!isLoading ? 'visible' : 'hidden'}>
        <h1 className="text-3xl">{message}</h1>
      </Activity>
      {isLoading ? renderCaseSkeletons : renderCases}
    </div>
  );
}
