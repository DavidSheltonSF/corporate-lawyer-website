import { EmailIcon } from '@/components/icons/EmailIcon';
import { PhoneIcon } from '@/components/icons/PhoneIcon';
import { InfoItem } from '@/components/ui/InfoItem';

interface Props {
  email: string;
  phone: string;
}

export function ClientCardFooter({ email, phone }: Props) {
  return (
    <footer className="flex flex-col min-md:flex-row min-md:w-[88%] gap-[8px] min-md:gap-[24px]">
      <InfoItem Icon={EmailIcon} value={email} />
      <InfoItem Icon={PhoneIcon} value={phone} />
    </footer>
  );
}
