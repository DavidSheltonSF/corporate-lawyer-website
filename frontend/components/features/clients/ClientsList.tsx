'use client';
import { WithId } from '@/types/WithId';
import { CardSkeleton } from '../../ui/Card/CardSkeleton';
import { ClientCard } from './ClientCard/ClientCard';
import { SafeUser } from '@/types/SafeUser';
import { RequestState } from '@/types/RequestState';

interface Props {
  fetchClients: () => void;
  requestState: RequestState<WithId<SafeUser>[]>;
}

export function ClientsList({ requestState, fetchClients }: Props) {
  function renderContent() {
    switch (requestState?.status) {
      case 'loading':
        const renderCaseSkeletons = Array.from({ length: 4 }).map((page, index) => {
          return <CardSkeleton key={index} />;
        });
        return renderCaseSkeletons;

      case 'ok':
        const { data } = requestState;

        if (data.length === 0) {
          return <h1 className="text-3xl">Nenhum cliente foi encontrado</h1>;
        }

        const renderCases = data.map((client, index) => {
          return <ClientCard fetchClients={fetchClients} key={index} clientData={client} />;
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
