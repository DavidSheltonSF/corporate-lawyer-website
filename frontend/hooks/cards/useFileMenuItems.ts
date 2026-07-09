import { DeleteIcon } from '@/components/icons/DeleteIcon';
import { MenuItem } from '@/types/MenuItem';
import { usePermissions } from '../auth/usePermissions';
import { DownloadIcon } from '@/components/icons/DownloadIcon';
import { EditIcon } from '@/components/icons/EditIcon';

interface Props {
  onRename: () => void;
  onDelete: () => void;
  onDownload: () => void;
}

export function useFileMenuItems({ onRename, onDelete, onDownload }: Props): MenuItem[] {
  const permissions = usePermissions();

  const items = [];

  if (permissions?.canRenameFiles) {
    items.push({
      label: 'Renomear',
      Icon: EditIcon,
      action: onRename,
    });
  }

  if (permissions?.canDeleteFiles) {
    items.push({
      label: 'Remover',
      Icon: DeleteIcon,
      visible: permissions.canDeleteCase,
      action: onDelete,
    });
  }

  if (permissions?.canDownloadFiles) {
    items.push({
      label: 'Download',
      Icon: DownloadIcon,
      visible: permissions.canDeleteCase,
      action: onDownload,
    });
  }

  return items;
}
