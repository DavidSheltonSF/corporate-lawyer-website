'use client';
import { WithId } from '@/types/WithId';
import { Activity, useState } from 'react';
import { CardSkeleton } from '../../ui/Card/CardSkeleton';
import { ClientCard } from './ClientCard/ClientCard';
import { SafeUser } from '@/types/SafeUser';
import { RequestState } from '@/types/RequestState';

interface Props {
  clients: WithId<SafeUser>[];
  loadClients: () => void;
  requestState: RequestState | null;
}

export function ClientsList({ clients, requestState, loadClients }: Props) {
  const renderCases = clients?.map((client, index) => {
    return <ClientCard loadClients={loadClients} key={index} clientData={client} />;
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

  return (
    <div className="flex flex-col gap-[32px] mt-[88px] w-full">
      <Activity mode={!isLoading ? 'visible' : 'hidden'}>
        <h1 className="text-3xl">{message}</h1>
      </Activity>
      {isLoading ? renderCaseSkeletons : renderCases}
    </div>
  );
}
