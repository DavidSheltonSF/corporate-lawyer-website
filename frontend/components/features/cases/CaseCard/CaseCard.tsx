import { formatStringList } from '@/lib/formatStringList';
import { WithId } from '@/types/WithId';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { Card } from '../../../ui/Card/Card';
import { CaseCardHeader } from './CaseCardHeader';
import { CaseCardFooter } from './CaseCardFooter';
import { EditIcon } from '@/components/icons/EditIcon';
import { DeleteIcon } from '@/components/icons/DeleteIcon';
import { CardAction } from '@/components/ui/CardDropdown/types';
import { ButtonVariant } from '@/components/ui/Button/ButtonVariant';
import { useCaseModal } from '@/hooks/modals/useCaseModal';
import { useDeadlinesModal } from '@/hooks/modals/useDeadlinesModal';
import { useCaseFilesModal } from '@/hooks/modals/useCaseFilesModal';
import { useConfirmModal } from '@/hooks/modals/useConfirmModal';
import { useUpdateCaseModal } from '@/hooks/modals/useUpdateCaseModal';
import { usePermissions } from '@/hooks/auth/usePermissions';
import { CalendarIcon } from '@/components/icons/CalendarIcon';
import { DocumentIcon } from '@/components/icons/DocumentIcon';

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

  const permissions = usePermissions();

  function handleUpdate() {
    openUpdateCaseModal(id, refetchCases);
  }

  function handleDelete() {
    openConfirmModal({
      title: 'Excluir processo',
      message: 'Tem certeza que deseja excluir este processo? Essa ação não poderá ser desfeita.',
      confirmButtonVariant: ButtonVariant.DANGER,
      onConfirm: async () => {
        deleteCase(id);
        refetchCases();
      },
    });
  }

  function handleOpenDeadlines() {
    openDeadlinesModal(id);
  }

  function handleOpenCaseFiles() {
    openCaseFilesModal(id);
  }

  const ACTIONS: CardAction[] = [
    {
      label: 'Alterar',
      Icon: EditIcon,
      visible: permissions.canUpdateCase,
      action: handleUpdate,
    },
    {
      label: 'Remover',
      Icon: DeleteIcon,
      visible: permissions.canDeleteCase,
      action: handleDelete,
    },
    {
      label: 'Ver prazos',
      Icon: CalendarIcon,
      visible: permissions.canSeeDeadlines,
      action: handleOpenDeadlines,
    },
    { label: 'Ver arquivos', Icon: DocumentIcon, visible: true, action: handleOpenCaseFiles },
  ].filter((action) => action.visible);

  return (
    <Card
      actions={ACTIONS}
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
