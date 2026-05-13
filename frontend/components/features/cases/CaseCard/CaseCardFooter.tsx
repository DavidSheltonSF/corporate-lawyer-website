import { BalanceIcon } from '@/components/icons/BalanceIcon';
import { FolderIcon } from '@/components/icons/FolderIcon';
import { UserIcon } from '@/components/icons/UserIcon';
import { InfoItem } from '@/components/ui/InfoItem';
import { CaseStatusLabel } from '@/lib/CaseStatusLabel';
import { CaseStatusEnum } from '@/types/CaseStatusEnum';

interface Props {
  clientName: string;
  lawyerName: string;
  status: CaseStatusEnum;
}

export function CaseCardFooter({ clientName, lawyerName, status }: Props) {
  let statusColor = '';

  switch (status) {
    case CaseStatusEnum.open:
      statusColor = 'var(--color-green)';
      break;

    case CaseStatusEnum.closed:
      statusColor = 'var(--color-red)';
      break;

    default:
      break;
  }

  return (
    <div className="flex flex-col min-md:flex-row min-md:w-[88%] gap-[8px]">
      <InfoItem Icon={UserIcon} value={clientName} />
      <InfoItem Icon={BalanceIcon} value={lawyerName} />
      <InfoItem Icon={FolderIcon} value={CaseStatusLabel[status]} valueColor={statusColor}/>
    </div>
  );
}
