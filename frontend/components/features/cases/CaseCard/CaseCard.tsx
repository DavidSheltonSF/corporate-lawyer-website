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
import { ButtonVariant } from '@/components/ui/Button/ButtonVariant';

interface Props {
  caseData: WithId<CaseWithRelations>;
  deleteCase: (id: string) => Promise<void>;
  refetchCases: () => void;
}

CaseCard.Header = CaseCardHeader;
CaseCard.Footer = CaseCardFooter;

export function CaseCard({ caseData, deleteCase, refetchCases }: Props) {
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
      title: 'Excluir processo',
      message: 'Tem certeza que deseja excluir este processo? Essa ação não poderá ser desfeita.',
      confirmButtonVariant: ButtonVariant.DANGER,
      onConfirm: async () => {
        await deleteCase(id);
        refetchCases();
      },
    });
  }

  function openDeadlinesModal() {
    openModal('deadlines', { caseId: caseData.id });
  }

  return (
    <Card
      actions={[
        makeCardAction(CardActionType.EDIT, openUpdateCaseModal),
        makeCardAction(CardActionType.DELETE, openConfirmModal),
        makeCardAction(CardActionType.CHECK_DEADLINES, openDeadlinesModal),
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
