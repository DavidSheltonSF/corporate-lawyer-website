import { WithId } from '@/types/WithId';
import { SafeUser } from '@/types/SafeUser';
import { Card } from '../../../ui/Card/Card';
import { ClientCardHeader } from './ClientCardHeader';
import { ClientCardFooter } from './ClientCardFooter';

interface Props {
  clientData: WithId<SafeUser>;
  openClientModal: Function;
  openOptionsModal: Function;
}

ClientCard.Header = ClientCardHeader;
ClientCard.Footer = ClientCardFooter;

export function ClientCard({ clientData, openClientModal, openOptionsModal }: Props) {
  const { id, firstName, lastName, email, phone, cpf } = clientData;

  return (
    <Card
      className="w-full h-fit min-md:w-[720px]"
      openModal={() => {
        openClientModal(id);
      }}
      openOptionsModal={openOptionsModal}
    >
      <div className="flex flex-col text-color-black p-[24px] gap-[32px]">
        <ClientCard.Header clientName={`${firstName} ${lastName}`} cpf={cpf} />
        <ClientCard.Footer email={email} phone={phone} />
      </div>
    </Card>
  );
}
