import { CalendarIcon } from '@/components/icons/CalendarIcon';
import { DeleteIcon } from '@/components/icons/DeleteIcon';
import { DocumentIcon } from '@/components/icons/DocumentIcon';
import { EditIcon } from '@/components/icons/EditIcon';
import { CardAction } from '@/components/ui/CardDropdown/types';
import { usePermissions } from '../auth/usePermissions';

interface Props {
  onUpdate: () => void;
  onDelete: () => void;
  onOpenDeadlines: () => void;
  onOpenFiles: () => void;
}

export function useCaseCardActions({
  onUpdate,
  onDelete,
  onOpenDeadlines,
  onOpenFiles,
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
      label: 'Ver prazos',
      Icon: CalendarIcon,
      visible: permissions.canSeeDeadlines,
      action: onOpenDeadlines,
    },
    { label: 'Ver arquivos', Icon: DocumentIcon, visible: true, action: onOpenFiles },
  ].filter((action) => action.visible);
}
