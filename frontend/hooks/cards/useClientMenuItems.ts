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

export function useClientMenuItems({ onUpdate, onDelete, onRedirectToCases }: Props): MenuItem[] {
  const permissions = usePermissions();
  const items = [];

  if (permissions?.canUpdateClients) {
    items.push({
      label: 'Alterar',
      Icon: EditIcon,
      action: onUpdate,
    });
  }

  if (permissions?.canDeleteClients) {
    items.push({
      label: 'Remover',
      Icon: DeleteIcon,
      action: onDelete,
    });
  }

  items.push({
    label: 'Ver processos',
    Icon: BalanceIcon,
    visible: true,
    action: onRedirectToCases,
  });

  return items;
}
