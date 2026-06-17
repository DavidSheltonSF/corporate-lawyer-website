import { WithId } from '@/types/WithId';
import { SafeUser } from '@/types/SafeUser';
import { Card } from '../../../ui/Card/Card';
import { ClientCardHeader } from './ClientCardHeader';
import { ClientCardFooter } from './ClientCardFooter';
import { useClientCardActions } from '@/hooks/cards/useClientCardActions';
import { useRouter } from 'next/navigation';
import { UserSlice } from '@/types/UserSlice';

interface Props {
  clientData: WithId<SafeUser>;
  openDeleteModal: (clientSlice: WithId<UserSlice>) => void;
  openUpdateModal: (clientId: string) => void;
  fetchClients: () => void;
}

ClientCard.Header = ClientCardHeader;
ClientCard.Footer = ClientCardFooter;

export function ClientCard({ clientData, openDeleteModal, openUpdateModal, fetchClients }: Props) {
  const router = useRouter();
  const { id, firstName, lastName, email, phone, cpf } = clientData;

  function handleSeeCases() {
    const clientName = `${firstName} ${lastName}`;
    router.push(`processos?clientId=${id}&clientName=${encodeURIComponent(clientName)}`);
  }

  const actions = useClientCardActions({
    onDelete: () => openDeleteModal({ id, firstName, lastName }),
    onUpdate: () => openUpdateModal(id),
    onRedirectToCases: handleSeeCases,
  });

  if (!actions) {
    return null;
  }

  return (
    <Card className="w-full h-fit min-md:w-[720px]" actions={actions}>
      <div className="flex flex-col text-color-black p-[24px] gap-[32px]">
        <ClientCard.Header clientName={`${firstName} ${lastName}`} cpf={cpf} />
        <ClientCard.Footer email={email} phone={phone} />
      </div>
    </Card>
  );
}
