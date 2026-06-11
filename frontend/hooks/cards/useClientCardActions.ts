import { DeleteIcon } from '@/components/icons/DeleteIcon';
import { EditIcon } from '@/components/icons/EditIcon';
import { CardAction } from '@/components/ui/CardDropdown/types';
import { usePermissions } from '../auth/usePermissions';
import { BalanceIcon } from '@/components/icons/BalanceIcon';

interface Props {
  onUpdate: () => void;
  onDelete: () => void;
  onOpenClientCasesModal: () => void;
}

export function useClientCardActions({
  onUpdate,
  onDelete,
  onOpenClientCasesModal,
}: Props): CardAction[] {
  const permissions = usePermissions();

  return [
    {
      label: 'Alterar',
      Icon: EditIcon,
      visible: permissions.canUpdateCase,
      action: onUpdate,
    },
    {
      label: 'Remover',
      Icon: DeleteIcon,
      visible: permissions.canDeleteCase,
      action: onDelete,
    },
    {
      label: 'Ver processos',
      Icon: BalanceIcon,
      visible: true,
      action: onOpenClientCasesModal,
    },
  ].filter((action) => action.visible);
}
