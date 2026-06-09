import { DeleteIcon } from '@/components/icons/DeleteIcon';
import { CardAction } from '@/components/ui/CardDropdown/types';
import { usePermissions } from '../auth/usePermissions';

interface Props {
  onDelete: () => void;
}

export function useDeadlineCardActions({ onDelete }: Props): CardAction[] {
  const permissions = usePermissions();

  return [
    {
      label: 'Remover',
      Icon: DeleteIcon,
      visible: permissions.canDeleteCase,
      action: onDelete,
    },
  ].filter((action) => action.visible);
}
