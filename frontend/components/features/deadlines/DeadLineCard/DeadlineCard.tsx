import { Card } from '@/components/ui/Card/Card';
import { formatDate } from '@/lib/formatDate';
import { Deadline } from '@/types/Deadline';
import { WithId } from '@/types/WithId';
import { RemainingDaysBadge } from '../badges/RemainingDaysBadge';
import { PriorityBadge } from '../badges/PriorityBadge';
import { CardAction } from '@/components/ui/CardDropdown/types';
import { deleteDeadline } from '@/services/cases/deleteDeadline';
import { useErrorModal } from '@/hooks/modals/useErrorModal';
import { useSuccessModal } from '@/hooks/modals/useSuccessModal';
import { useConfirmModal } from '@/hooks/modals/useConfirmModal';
import { ButtonVariant } from '@/components/ui/Button/ButtonVariant';
import { handleLogout } from '@/lib/handleLogout';
import { DeleteIcon } from '@/components/icons/DeleteIcon';
import { usePermissions } from '@/hooks/auth/usePermissions';
import { useDeadlineCardActions } from '@/hooks/cards/useDeadlineCardAction';

interface Props {
  deadline: WithId<Deadline>;
}

export function DeadlineCard({ deadline }: Props) {
  const { openErrorModal } = useErrorModal();
  const { openSuccessModal } = useSuccessModal();
  const { openConfirmModal } = useConfirmModal();

  async function handleDeleteDeadline() {
    const response = await deleteDeadline(deadline.id);

    if (!response.success) {
      if (response.code === 'UNAUTHORIZED') {
        handleLogout();
      }
      openErrorModal(response.message);
      return;
    }

    openSuccessModal('Prazo removido com sucesso!');
  }

  function handleOpenConfirmModal() {
    openConfirmModal({
      title: 'Remover prazo',
      message: 'Deseja realmente remover este prazo? Esta ação não poderá ser desfeita',
      onConfirm: handleDeleteDeadline,
      confirmButtonVariant: ButtonVariant.DANGER,
    });
  }

  const actions = useDeadlineCardActions({ onDelete: handleOpenConfirmModal });

  return (
    <Card className="border-divider rounded-none w-full p-[24px]" actions={actions}>
      <div className="flex flex-col min-md:flex-row min-md:justify-between min-md:items-end gap-[16px] text-sm min-md:text-md">
        <div className="flex flex-col gap-[8px]">
          <p className="font-bold text-base">{deadline.type}</p>
          <p className="text-muted">
            Período: {formatDate(deadline.startDate)} - {formatDate(deadline.dueDate)}
          </p>
        </div>
        <div className="flex gap-[8px]">
          <RemainingDaysBadge remainingDays={deadline.remainingDays} />
          <PriorityBadge priority={deadline.priority} />
        </div>
      </div>
    </Card>
  );
}
