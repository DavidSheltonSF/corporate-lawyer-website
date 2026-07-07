import { DeleteIcon } from '@/components/icons/DeleteIcon';
import { EditIcon } from '@/components/icons/EditIcon';
import { MenuItem } from '@/types/MenuItem';
import { usePermissions } from '../auth/usePermissions';
import { BalanceIcon } from '@/components/icons/BalanceIcon';

interface Props {
  onUpdate: () => void;
  onDelete: () => void;
  onRedirectToCases: () => void;
}

export function useClientCardActions({
  onUpdate,
  onDelete,
  onRedirectToCases,
}: Props): MenuItem[] | null {
  const permissions = usePermissions();

  if (!permissions) {
    return null;
  }

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
      action: onRedirectToCases,
    },
  ].filter((action) => action.visible);
}
