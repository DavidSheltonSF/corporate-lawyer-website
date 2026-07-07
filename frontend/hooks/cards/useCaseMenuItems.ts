import { CalendarIcon } from '@/components/icons/CalendarIcon';
import { DeleteIcon } from '@/components/icons/DeleteIcon';
import { DocumentIcon } from '@/components/icons/DocumentIcon';
import { EditIcon } from '@/components/icons/EditIcon';
import { MenuItem } from '@/types/MenuItem';
import { usePermissions } from '../auth/usePermissions';

interface Props {
  onUpdate: () => void;
  onDelete: () => void;
  onOpenDeadlines: () => void;
  onOpenFiles: () => void;
}

export function useCaseMenuItems({
  onUpdate,
  onDelete,
  onOpenDeadlines,
  onOpenFiles,
}: Props): MenuItem[] {
  const permissions = usePermissions();
  const items = [];

  if (permissions?.canUpdateCase) {
   items.push({
     label: 'Alterar',
     Icon: EditIcon,
     action: onUpdate,
   });
  }

  if (permissions?.canDeleteCase) {
    items.push({
      label: 'Remover',
      Icon: DeleteIcon,
      action: onDelete,
    });
  }

  if (permissions?.canSeeDeadlines) {
    items.push({
      label: 'Ver prazos',
      Icon: CalendarIcon,
      action: onOpenDeadlines,
    });
  }

  if (permissions?.canSeeFiles) {
    items.push({ label: 'Ver arquivos', Icon: DocumentIcon, visible: true, action: onOpenFiles });
  }
  return items
}
