import { DeleteIcon } from '@/components/icons/DeleteIcon';
import { MenuItem } from '@/types/MenuItem';
import { usePermissions } from '../auth/usePermissions';

interface Props {
  onDelete: () => void;
}

export function useDeadlineMenuItems({ onDelete }: Props): MenuItem[] | null {
  const permissions = usePermissions();

  if (!permissions) {
    return null;
  }

  return [
    {
      label: 'Remover',
      Icon: DeleteIcon,
      visible: permissions.canDeleteCase,
      action: onDelete,
    },
  ].filter((action) => action.visible);
}
