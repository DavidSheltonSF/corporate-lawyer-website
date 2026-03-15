'use client';
import { WithId } from '@/types/WithId';
import { Activity, useState } from 'react';
import { CaseCardSkeleton } from './CaseCardSkeleton';
import { ClientCard } from './ClientCard';
import { SafeUser } from '@/types/SafeUser';
import { ClientCardOptionsModal } from './modals/ClientCardOptionsModal';

interface Props {
  clients: WithId<SafeUser>[];
  loading: boolean;
}

export function ClientsList({ clients, loading }: Props) {
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
  return (
    <div className="flex flex-col gap-[32px] mt-[88px] w-full">
      <ClientCardOptionsModal
        isOpen={optionsModalIsOpen}
        closeModal={closeOptionsModal}
        selectedUserId={selectedUserId}
      />
      <Activity mode={!loading && (!clients || clients.length === 0) ? 'visible' : 'hidden'}>
        <h1 className="text-3xl">Nenhum cliente encontrado</h1>
      </Activity>
      {loading ? renderCaseSkeletons : renderCases}
    </div>
  );
}
