import { FieldValue } from '@/components/FieldValue';
import { EmailIcon } from '@/components/icons/EmailIcon';
import { PhoneIcon } from '@/components/icons/PhoneIcon';
import { Case } from '@/types/Case';
import { SafeUser } from '@/types/SafeUser';

interface Props {
  clientData: (SafeUser & { cases: Case[] }) | null;
}

export function ClientModalInfo({ clientData }: Props) {
  if (!clientData) return null;
  const { email, phone } = clientData;
  return (
    <div className="flex flex-col min-md:flex-row min-md:items-start text-lg min-lg:text-xl gap-[8px] min-md:gap-[40px] p-[24px]">
      <div className="flex gap-2">
        <EmailIcon width="24px" height="24px" />
        <span>{email}</span>
      </div>
      <div className="flex gap-2">
        <PhoneIcon width="24px" height="24px" />
        <span>{phone}</span>
      </div>
    </div>
  );
}
