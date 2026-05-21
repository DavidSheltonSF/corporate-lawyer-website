import { FieldValue } from '@/components/FieldValue';
import { BalanceIcon } from '@/components/icons/BalanceIcon';
import { FolderIcon } from '@/components/icons/FolderIcon';
import { UserIcon } from '@/components/icons/UserIcon';
import { InfoItem } from '@/components/ui/InfoItem';
import { BrazilStateLabel } from '@/lib/BrazilStateLabel';
import { CaseStatusLabel } from '@/lib/CaseStatusLabel';
import { CityLabel } from '@/lib/CityLabel';
import { CaseStatusEnum } from '@/types/CaseStatusEnum';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { WithId } from '@/types/WithId';

interface Props {
  caseData: WithId<CaseWithRelations> | null;
}

export function CaseModalContent({ caseData }: Props) {
  if (!caseData) return null;
  const { client, lawyers, status, court, courtDivision, location } = caseData;
  const { firstName, lastName } = client;
  const lawyer = lawyers[0];

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
    <div className="flex flex-col font-size-md overflow-y-auto overflow-x-hidden h-[44vh]">
      <div className="flex flex-col items-center min-md:flex-row min-md:items-start min-md:gap-[40px] p-[24px] border-divider">
        <InfoItem Icon={UserIcon} value={`${firstName} ${lastName}`} />
        <InfoItem Icon={BalanceIcon} value={`${lawyer.firstName} ${lawyer.lastName}`} />
        <InfoItem valueColor={statusColor} Icon={FolderIcon} value={CaseStatusLabel[status]} />
      </div>
      <div className="flex flex-col justify-center gap-[8px] p-[24px] borer-b border-divider">
        <FieldValue field="tribunal" value={court} />
        <FieldValue field="vara" value={courtDivision} />
        <FieldValue field="estado" value={BrazilStateLabel[location.state]} />
        <FieldValue field="cidade" value={CityLabel[location.city]} />
      </div>
      <div className="flex flex-col gap-[8px] p-[24px]">
        <h1 className="text-2xl font-bold">Resumo</h1>
        <p>{caseData.description}</p>
      </div>
    </div>
  );
}
