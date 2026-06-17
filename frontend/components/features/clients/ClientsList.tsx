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
  requestState: RequestState<WithId<SafeUser>[]>;
}

ClientsList.Skeleton = ClientsListSkeleton;

export function ClientsList({
  requestState,
  openDeleteModal,
  openUpdateModal,
  fetchClients,
}: Props) {
  function renderContent() {
    switch (requestState?.status) {
      case 'loading':
        return null;

      case 'ok':
        const { data } = requestState;

        if (data.length === 0) {
          return <h1 className="text-3xl">Nenhum cliente foi encontrado</h1>;
        }

        const renderCases = data.map((client, index) => {
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
        return renderCases;

      case 'error':
        <h1>{requestState.message}</h1>;

      default:
        return null;
    }
  }

  return <div className="flex flex-col gap-[32px] mt-[88px] w-full">{renderContent()}</div>;
}
