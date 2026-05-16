import { WithId } from '@/types/WithId';
import { SafeUser } from '@/types/SafeUser';
import { Card } from '../../../ui/Card/Card';
import { ClientCardHeader } from './ClientCardHeader';
import { ClientCardFooter } from './ClientCardFooter';
import { EditIcon } from '@/components/icons/EditIcon';
import { DeleteIcon } from '@/components/icons/DeleteIcon';
import { useModal } from '@/hooks/useModal';

interface Props {
  clientData: WithId<SafeUser>;
  openDropdown: () => void;
  isDropdownOpen: boolean;
  closeDropdown: () => void;
}

ClientCard.Header = ClientCardHeader;
ClientCard.Footer = ClientCardFooter;

export function ClientCard({ clientData, openDropdown, isDropdownOpen, closeDropdown }: Props) {
  const { id, firstName, lastName, email, phone, cpf } = clientData;
  const { openModal } = useModal();

  return (
    <Card
      className="w-full h-fit min-md:w-[720px]"
      actions={[
        {
          label: 'Alterar',
          Icon: EditIcon,
          action: () => {
            openModal('update-client', { clientId: id });
          },
        },
        {
          label: 'Deletar',
          Icon: DeleteIcon,
          action: () => {},
        },
      ]}
      openDropdown={openDropdown}
      isDropdownOpen={isDropdownOpen}
      closeDropdown={closeDropdown}
      openCardModal={() => {
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
