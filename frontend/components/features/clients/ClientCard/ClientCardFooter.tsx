import { EmailIcon } from '@/components/icons/EmailIcon';
import { PhoneIcon } from '@/components/icons/PhoneIcon';

interface Props {
  email: string;
  phone: string;
}

export function ClientCardFooter({ email, phone }: Props) {
  return (
    <footer className="flex flex-col min-md:flex-row min-md:w-[88%] min-md gap-[8px] min-md:gap-[80px]">
      <div className="flex gap-2 flex-1">
        <EmailIcon width="24px" height="24px" />
        <span>{email}</span>
      </div>
      <div className="flex gap-2 flex-1">
        <PhoneIcon width="24px" height="24px" />
        <span>{phone}</span>
      </div>
    </footer>
  );
}
