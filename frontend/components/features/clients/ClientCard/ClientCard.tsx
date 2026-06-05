import { WithId } from '@/types/WithId';
import { SafeUser } from '@/types/SafeUser';
import { Card } from '../../../ui/Card/Card';
import { ClientCardHeader } from './ClientCardHeader';
import { ClientCardFooter } from './ClientCardFooter';
import { makeCardAction } from '@/components/ui/CardDropdown/makeCardAction';
import { CardActionType } from '@/components/ui/CardDropdown/types';
import { ButtonVariant } from '@/components/ui/Button/ButtonVariant';
import { useUpdateClientModal } from '@/hooks/modals/useUpdateClientModal';
import { useDeleteClientModal } from '@/hooks/modals/useDeleteClientModal';
import { useClientModal } from '@/hooks/modals/useClientModal';

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

  return (
    <Card
      className="w-full h-fit min-md:w-[720px]"
      actions={[
        makeCardAction(CardActionType.EDIT, () => openUpdateClientModal(id, fetchClients)),
        makeCardAction(CardActionType.DELETE, () =>
          openDeleteClientModal({ id, firstName, lastName })
        ),
      ]}
      onClick={() => openClientModal(id)}
    >
      <div className="flex flex-col text-color-black p-[24px] gap-[32px]">
        <ClientCard.Header clientName={`${firstName} ${lastName}`} cpf={cpf} />
        <ClientCard.Footer email={email} phone={phone} />
      </div>
    </Card>
  );
}
