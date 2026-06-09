import { DeleteIcon } from '@/components/icons/DeleteIcon';
import { EditIcon } from '@/components/icons/EditIcon';
import { CardAction } from '@/components/ui/CardDropdown/types';
import { usePermissions } from '../auth/usePermissions';

interface Props {
  onUpdate: () => void;
  onDelete: () => void;
}

export function useClientCardActions({ onUpdate, onDelete }: Props): CardAction[] {
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
  ].filter((action) => action.visible);
}
