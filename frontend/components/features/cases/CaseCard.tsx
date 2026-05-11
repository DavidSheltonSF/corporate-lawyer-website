import { formatStringList } from '@/lib/formatStringList';
import { CaseStatusEnum } from '@/types/CaseStatusEnum';
import { WithId } from '@/types/WithId';
import { CaseStatusLabel } from '@/lib/CaseStatusLabel';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { Card } from '../../ui/Card/Card';
import { UserIcon } from '@/components/icons/UserIcon';
import { BalanceIcon } from '@/components/icons/BalanceIcon';
import { FolderIcon } from '@/components/icons/FolderIcon';

interface Props {
  openCaseModal: Function;
  openOptionsModal: Function;
  caseData: WithId<CaseWithRelations>;
}

export function CaseCard({ caseData, openCaseModal, openOptionsModal }: Props) {
  const clientData = caseData.client;

  const { title, processNumber, status } = caseData;

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

  const lawyersNames = caseData.lawyers?.map((lawyer) => {
    return `${lawyer.firstName} ${lawyer.lastName}`;
  });

  return (
    <Card openOptionsModal={() => openOptionsModal()} openModal={() => openCaseModal()}>
      <div className="flex flex-col text-color-black p-[24px] gap-[32px]">
        <div className="flex flex-col gap-[8px]">
          <h3 className="font-bold">{title}</h3>
          <span className="small-text opacity-70">nº {processNumber}</span>
        </div>
        <div className="flex flex-col min-md:flex-row min-md:w-[88%] gap-[80px]">
          <div className="flex gap-2 flex-1">
            <UserIcon width="24px" height="24px" />
            <span>
              {clientData?.firstName} {clientData?.lastName}
            </span>
          </div>
          <div className="flex gap-2 flex-1">
            <BalanceIcon width="24px" height="24px" />
            <span>{formatStringList(lawyersNames)}</span>
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
      </div>
    </Card>
  );
}
