import { BalanceIcon } from '@/components/icons/BalanceIcon';
import { FolderIcon } from '@/components/icons/FolderIcon';
import { UserIcon } from '@/components/icons/UserIcon';
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
    <div className="flex flex-col min-md:flex-row min-md:w-[88%] gap-[80px]">
      <div className="flex gap-2 flex-1">
        <UserIcon width="24px" height="24px" />
        <span>{clientName}</span>
      </div>
      <div className="flex gap-2 flex-1">
        <BalanceIcon width="24px" height="24px" />
        <span>{lawyerName}</span>
      </div>
      <div className="flex gap-2 flex-1">
        <FolderIcon width="24px" height="24px" />
        <span
          style={{
            color: statusColor,
          }}
        >
          {CaseStatusLabel[status]}
        </span>
      </div>
    </div>
  );
}
