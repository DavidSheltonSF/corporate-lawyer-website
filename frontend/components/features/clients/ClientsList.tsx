'use client';
import { WithId } from '@/types/WithId';
import { CardSkeleton } from '../../ui/Card/CardSkeleton';
import { ClientCard } from './ClientCard/ClientCard';
import { SafeUser } from '@/types/SafeUser';
import { RequestState } from '@/types/RequestState';
import { ClientsListSkeleton } from './ClientsListSkeleton';
import { UserSlice } from '@/types/UserSlice';

interface Props {
  fetchClients: () => void;
  openDeleteModal: (clientSlice: WithId<UserSlice>) => void;
  openUpdateModal: (clientId: string) => void;
  clients: WithId<SafeUser>[];
}

ClientsList.Skeleton = ClientsListSkeleton;

export function ClientsList({ clients, openDeleteModal, openUpdateModal, fetchClients }: Props) {
  const renderCases = clients.map((client, index) => {
    return (
      <ClientCard
        openDeleteModal={openDeleteModal}
        openUpdateModal={openUpdateModal}
        fetchClients={fetchClients}
        key={index}
        clientData={client}
      />
    );
  });

  return <div className="flex flex-col gap-[32px] w-full">{renderCases}</div>;
}
