import { WithId } from '@/types/WithId';
import { SafeUser } from '@/types/SafeUser';
import { Card } from '../../../ui/Card/Card';
import { ClientCardHeader } from './ClientCardHeader';
import { ClientCardFooter } from './ClientCardFooter';
import { useModal } from '@/hooks/useModal';
import { makeCardAction } from '@/components/ui/CardDropdown/makeCardAction';
import { CardActionType } from '@/components/ui/CardDropdown/types';
import { ButtonVariant } from '@/components/ui/Button/ButtonVariant';

interface Props {
  clientData: WithId<SafeUser>;
  fetchClients: () => void;
}

ClientCard.Header = ClientCardHeader;
ClientCard.Footer = ClientCardFooter;

export function ClientCard({ clientData, fetchClients }: Props) {
  const { id, firstName, lastName, email, phone, cpf } = clientData;
  const { openModal } = useModal();

  function openEditModal() {
    openModal('update-client', {
      clientId: id,
      fetchClients,
    });
  }

  function openDeleteModal() {
    openModal('delete-client', {
      clientSlice: { id, firstName, lastName },
      fetchClients,
      variant: ButtonVariant.DANGER,
    });
  }

  return (
    <Card
      className="w-full h-fit min-md:w-[720px]"
      actions={[
        makeCardAction(CardActionType.EDIT, openEditModal),
        makeCardAction(CardActionType.DELETE, openDeleteModal),
      ]}
      onClick={() => {
        openModal('client', { clientId: id });
      }}
    >
      <div className="flex flex-col text-color-black p-[24px] gap-[32px]">
        <ClientCard.Header clientName={`${firstName} ${lastName}`} cpf={cpf} />
        <ClientCard.Footer email={email} phone={phone} />
      </div>
    </Card>
  );
}
