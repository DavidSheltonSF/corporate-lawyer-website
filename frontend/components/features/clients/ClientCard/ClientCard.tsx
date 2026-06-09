import { WithId } from '@/types/WithId';
import { SafeUser } from '@/types/SafeUser';
import { Card } from '../../../ui/Card/Card';
import { ClientCardHeader } from './ClientCardHeader';
import { ClientCardFooter } from './ClientCardFooter';
import { CardAction } from '@/components/ui/CardDropdown/types';
import { useUpdateClientModal } from '@/hooks/modals/useUpdateClientModal';
import { useDeleteClientModal } from '@/hooks/modals/useDeleteClientModal';
import { useClientModal } from '@/hooks/modals/useClientModal';
import { EditIcon } from '@/components/icons/EditIcon';
import { DeleteIcon } from '@/components/icons/DeleteIcon';
import { usePermissions } from '@/hooks/auth/usePermissions';
import { useClientCardActions } from '@/hooks/cards/useClientCardActions';

interface Props {
  clientData: WithId<SafeUser>;
  fetchClients: () => void;
}

ClientCard.Header = ClientCardHeader;
ClientCard.Footer = ClientCardFooter;

export function ClientCard({ clientData, fetchClients }: Props) {
  const { id, firstName, lastName, email, phone, cpf } = clientData;

  const { openUpdateClientModal } = useUpdateClientModal();
  const { openDeleteClientModal } = useDeleteClientModal();
  const { openClientModal } = useClientModal();

  function handleUpdate() {
    openUpdateClientModal(id, fetchClients);
  }

  function handleDelete() {
    openDeleteClientModal({ id, firstName, lastName }, fetchClients);
  }

  const actions = useClientCardActions({ onUpdate: handleUpdate, onDelete: handleDelete });

  return (
    <Card
      className="w-full h-fit min-md:w-[720px]"
      actions={actions}
      onClick={() => openClientModal(id)}
    >
      <div className="flex flex-col text-color-black p-[24px] gap-[32px]">
        <ClientCard.Header clientName={`${firstName} ${lastName}`} cpf={cpf} />
        <ClientCard.Footer email={email} phone={phone} />
      </div>
    </Card>
  );
}
