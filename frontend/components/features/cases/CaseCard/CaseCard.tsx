import { formatStringList } from '@/lib/formatStringList';
import { WithId } from '@/types/WithId';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { Card } from '../../../ui/Card/Card';
import { CaseCardHeader } from './CaseCardHeader';
import { CaseCardFooter } from './CaseCardFooter';

interface Props {
  openCaseModal: Function;
  openOptionsModal: Function;
  caseData: WithId<CaseWithRelations>;
}

CaseCard.Header = CaseCardHeader;
CaseCard.Footer = CaseCardFooter;

export function CaseCard({ caseData, openCaseModal, openOptionsModal }: Props) {
  const clientData = caseData.client;
  const { firstName, lastName } = clientData;

  const { id, status } = caseData;

  const lawyersNames = caseData.lawyers?.map((lawyer) => {
    return `${lawyer.firstName} ${lawyer.lastName}`;
  });

  return (
    <Card
      className="w-[20px] h-fit min-md:w-[720px]"
      openOptionsModal={() => openOptionsModal()}
      openModal={() => openCaseModal(id)}
    >
      <div className="flex flex-col text-color-black p-[24px] gap-[32px]">
        <CaseCard.Header title={caseData.title} processNumber={caseData.processNumber} />
        <CaseCard.Footer
          status={status}
          clientName={`${firstName} ${lastName}`}
          lawyerName={formatStringList(lawyersNames)}
        />
      </div>
    </Card>
  );
}
