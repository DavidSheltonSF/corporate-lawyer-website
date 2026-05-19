import { formatStringList } from '@/lib/formatStringList';
import { WithId } from '@/types/WithId';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { Card } from '../../../ui/Card/Card';
import { CaseCardHeader } from './CaseCardHeader';
import { CaseCardFooter } from './CaseCardFooter';
import { EditIcon } from '@/components/icons/EditIcon';
import { DeleteIcon } from '@/components/icons/DeleteIcon';
import { useModal } from '@/hooks/useModal';
import { makeCardAction } from '@/components/ui/CardDropdown/makeCardAction';
import { CardActionType } from '@/components/ui/CardDropdown/types';

interface Props {
  openDropdown: Function;
  caseData: WithId<CaseWithRelations>;
  isDropdownOpen: boolean;
  deleteCase: (id: string) => void;
  closeDropdown: () => void;
  refetchCases: () => void;
}

CaseCard.Header = CaseCardHeader;
CaseCard.Footer = CaseCardFooter;

export function CaseCard({
  caseData,
  openDropdown,
  isDropdownOpen,
  closeDropdown,
  deleteCase,
  refetchCases,
}: Props) {
  const clientData = caseData.client;
  const { firstName, lastName } = clientData;
  const { id, status } = caseData;
  const { openModal } = useModal();

  const lawyersNames = caseData.lawyers?.map((lawyer) => {
    return `${lawyer.firstName} ${lawyer.lastName}`;
  });

  function openUpdateCaseModal() {
    openModal('update-case', { caseId: id, refetchCases });
  }

  function openConfirmModal() {
    openModal('confirm', {
      message: 'Tem certeza que deseja excluir esse processo?',
      onConfirm: () => {
        deleteCase(id);
        refetchCases();
      },
    });
  }

  return (
    <Card
      actions={[
        makeCardAction(CardActionType.EDIT, openUpdateCaseModal),
        makeCardAction(CardActionType.DELETE, openConfirmModal),
      ]}
      className="relative w-full h-fit min-md:w-[720px]"
      onClick={() => openModal('case', { caseId: id })}
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
