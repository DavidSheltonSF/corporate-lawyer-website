import { formatStringList } from '@/lib/formatStringList';
import { WithId } from '@/types/WithId';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { Card } from '../../../ui/Card/Card';
import { CaseCardHeader } from './CaseCardHeader';
import { CaseCardFooter } from './CaseCardFooter';
import { EditIcon } from '@/components/icons/EditIcon';
import { DeleteIcon } from '@/components/icons/DeleteIcon';
import { makeCardAction } from '@/components/ui/CardDropdown/makeCardAction';
import { CardActionType } from '@/components/ui/CardDropdown/types';
import { ButtonVariant } from '@/components/ui/Button/ButtonVariant';
import { useCaseModal } from '@/hooks/modals/useCaseModal';
import { useDeadlinesModal } from '@/hooks/modals/useDeadlinesModal';
import { useCaseFilesModal } from '@/hooks/modals/useCaseFilesModal';
import { useConfirmModal } from '@/hooks/modals/useConfirmModal';
import { useUpdateCaseModal } from '@/hooks/modals/useUpdateCaseModal';

interface Props {
  caseData: WithId<CaseWithRelations>;
  deleteCase: (id: string) => void;
  refetchCases: () => void;
}

CaseCard.Header = CaseCardHeader;
CaseCard.Footer = CaseCardFooter;

export function CaseCard({ caseData, deleteCase, refetchCases }: Props) {
  const clientData = caseData.client;
  const { firstName, lastName } = clientData;
  const { id, status } = caseData;
  const { openCaseModal } = useCaseModal();
  const { openDeadlinesModal } = useDeadlinesModal();
  const { openCaseFilesModal } = useCaseFilesModal();
  const { openConfirmModal } = useConfirmModal();
  const { openUpdateCaseModal } = useUpdateCaseModal();

  const lawyersNames = caseData.lawyers?.map((lawyer) => {
    return `${lawyer.firstName} ${lawyer.lastName}`;
  });

  return (
    <Card
      actions={[
        makeCardAction(CardActionType.EDIT, () => openUpdateCaseModal(id, refetchCases)),
        makeCardAction(CardActionType.DELETE, () =>
          openConfirmModal({
            title: 'Excluir processo',
            message:
              'Tem certeza que deseja excluir este processo? Essa ação não poderá ser desfeita.',
            confirmButtonVariant: ButtonVariant.DANGER,
            onConfirm: async () => {
              deleteCase(id);
              refetchCases();
            },
          })
        ),
        makeCardAction(CardActionType.CHECK_DEADLINES, () => openDeadlinesModal(id)),
        makeCardAction(CardActionType.CHECK_FILES, () => openCaseFilesModal(id)),
      ]}
      className="relative w-full h-fit min-md:w-[720px]"
      onClick={() => openCaseModal(id)}
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
