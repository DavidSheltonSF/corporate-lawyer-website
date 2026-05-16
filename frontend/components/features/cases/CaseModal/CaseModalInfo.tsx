import { FieldValue } from '@/components/FieldValue';
import { BalanceIcon } from '@/components/icons/BalanceIcon';
import { EmailIcon } from '@/components/icons/EmailIcon';
import { FolderIcon } from '@/components/icons/FolderIcon';
import { PhoneIcon } from '@/components/icons/PhoneIcon';
import { UserIcon } from '@/components/icons/UserIcon';
import { InfoItem } from '@/components/ui/InfoItem';
import { BrazilStateLabel } from '@/lib/BrazilStateLabel';
import { CaseStatusLabel } from '@/lib/CaseStatusLabel';
import { CityLabel } from '@/lib/CityLabel';
import { Case } from '@/types/Case';
import { CaseStatusEnum } from '@/types/CaseStatusEnum';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { SafeUser } from '@/types/SafeUser';
import { WithId } from '@/types/WithId';

interface Props {
  caseData: WithId<CaseWithRelations> | null;
}

export function CaseModalInfo({ caseData }: Props) {
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
    <div className="flex flex-col justify-between text-lg min-lg:text-xl border-b border-divider">
      <div className="flex flex-col items-center min-md:flex-row min-md:items-start min-md:gap-[40px] border-b border-divider p-[24px]">
        <InfoItem Icon={UserIcon} value={`${firstName} ${lastName}`} />
        <InfoItem Icon={BalanceIcon} value={`${lawyer.firstName} ${lawyer.lastName}`} />
        <InfoItem valueColor={statusColor} Icon={FolderIcon} value={CaseStatusLabel[status]} />
      </div>
      <div className="flex flex-col justify-center gap-[8px] p-[24px]">
        <FieldValue field="tribunal" value={court} />
        <FieldValue field="vara" value={courtDivision} />
        <FieldValue field="estado" value={BrazilStateLabel[location.state]} />
        <FieldValue field="cidade" value={CityLabel[location.city]} />
      </div>
    </div>
  );
}
