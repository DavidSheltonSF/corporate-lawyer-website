import { formatStringList } from '@/lib/formatStringList';
import { CaseStatusEnum } from '@/types/CaseStatusEnum';
import { WithId } from '@/types/WithId';
import { CaseStatusLabel } from '@/lib/CaseStatusLabel';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { FieldValue } from './FieldValue';
import { Card } from './ui/Card/Card';

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
    <Card title={title} openModal={openCaseModal} openOptionsModal={openOptionsModal}>
      <FieldValue field="nº" value={processNumber} />
      <FieldValue field="cliente:" value={`${clientData?.firstName} ${clientData?.lastName}`} />
      <FieldValue field="advogados:" value={formatStringList(lawyersNames)} />
      <FieldValue valueTextColor={statusColor} field="status:" value={CaseStatusLabel[status]} />
    </Card>
  );
}
