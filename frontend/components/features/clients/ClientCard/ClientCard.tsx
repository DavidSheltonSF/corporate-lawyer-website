import { WithId } from '@/types/WithId';
import { SafeUser } from '@/types/SafeUser';
import { Card } from '../../../ui/Card/Card';
import { ClientCardHeader } from './ClientCardHeader';
import { ClientCardFooter } from './ClientCardFooter';
import { useUpdateClientModal } from '@/hooks/modals/useUpdateClientModal';
import { useDeleteClientModal } from '@/hooks/modals/useDeleteClientModal';
import { useClientCardActions } from '@/hooks/cards/useClientCardActions';
import { useRouter } from 'next/navigation';

interface Props {
  clientData: WithId<SafeUser>;
  fetchClients: () => void;
}

ClientCard.Header = ClientCardHeader;
ClientCard.Footer = ClientCardFooter;

export function ClientCard({ clientData, fetchClients }: Props) {
  const router = useRouter();
  const { id, firstName, lastName, email, phone, cpf } = clientData;

  const { openUpdateClientModal } = useUpdateClientModal();
  const { openDeleteClientModal } = useDeleteClientModal();

  function handleUpdate() {
    openUpdateClientModal(id, fetchClients);
  }

  function handleDelete() {
    openDeleteClientModal({ id, firstName, lastName }, fetchClients);
  }
  function handleSeeCases() {
    const clientName = `${firstName} ${lastName}`;
    router.push(`processos?clientId=${id}&clientName=${encodeURIComponent(clientName)}`);
  }

  const actions = useClientCardActions({
    onUpdate: handleUpdate,
    onDelete: handleDelete,
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
