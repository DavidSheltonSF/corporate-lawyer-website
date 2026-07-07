import { DeleteIcon } from '@/components/icons/DeleteIcon';
import { MenuItem } from '@/types/MenuItem';
import { usePermissions } from '../auth/usePermissions';

interface Props {
  onDelete: () => void;
}

export function useDeadlineMenuItems({ onDelete }: Props): MenuItem[] {
  const permissions = usePermissions();
  const items = [];

  if (permissions?.canDeleteCase) {
    items.push({
      label: 'Remover',
      Icon: DeleteIcon,
      visible: permissions.canDeleteCase,
      action: onDelete,
    });
  }

  return items;
}
