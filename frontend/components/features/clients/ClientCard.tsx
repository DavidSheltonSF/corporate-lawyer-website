import { WithId } from '@/types/WithId';
import { FieldValue } from '../../FieldValue';
import { SafeUser } from '@/types/SafeUser';
import { Card } from '../../ui/Card/Card';
import { UserIcon } from '@/components/icons/UserIcon';
import { EmailIcon } from '@/components/icons/EmailIcon';
import { PhoneIcon } from '@/components/icons/PhoneIcon';

interface Props {
  clientData: WithId<SafeUser>;
  openClientModal: Function;
  openOptionsModal: Function;
}

export function ClientCard({ clientData, openClientModal, openOptionsModal }: Props) {
  const { firstName, lastName, email, cpf } = clientData;

  return (
    <Card openModal={openClientModal} openOptionsModal={openOptionsModal}>
      <div className="flex flex-col text-color-black p-[24px] gap-[32px]">
        <header className="flex flex-col  gap-[8px] ">
          <div className="flex items-center gap-[32px]">
            <div className="flex justify-center items-center size-[5rem] border rounded-[8px]">
              <UserIcon width="40px" height="40px" />
            </div>
            <h2>
              {firstName} {lastName}
            </h2>
          </div>
          <div className="small-text opacity-70">
            <span>CPF: {cpf}</span>
          </div>
        </header>
        <div className="flex flex-col min-md:flex-row min-md:w-[88%] min-md gap-[8px] min-md:gap-[80px]">
          <div className="flex gap-2 flex-1">
            <EmailIcon width="24px" height="24px" />
            <span>{email}</span>
          </div>
          <div className="flex gap-2 flex-1">
            <PhoneIcon width="24px" height="24px" />
            <span>21969585855 - fake</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
