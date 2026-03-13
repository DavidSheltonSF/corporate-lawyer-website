'use client';
import { WithId } from '@/types/WithId';
import { Activity } from 'react';
import { CaseCardSkeleton } from './CaseCardSkeleton';
import { ClientCard } from './ClientCard';
import { SafeUser } from '@/types/SafeUser';

interface Props {
  clients: WithId<SafeUser>[];
  loading: boolean;
}

export function ClientsList({ clients, loading }: Props) {
  const renderCases = clients?.map((client, index) => {
    return <ClientCard key={index} clientData={client} />;
  });

  const renderCaseSkeletons = Array.from({ length: 4 }).map((page, index) => {
    return <CaseCardSkeleton key={index} />;
  });
  return (
    <div className="flex flex-col gap-[32px] mt-[88px] w-full">
      <Activity mode={!loading && (!clients || clients.length === 0) ? 'visible' : 'hidden'}>
        <h1 className="text-3xl">Nenhum cliente encontrado</h1>
      </Activity>
      {loading ? renderCaseSkeletons : renderCases}
    </div>
  );
}
