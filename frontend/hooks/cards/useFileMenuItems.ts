import { DeleteIcon } from '@/components/icons/DeleteIcon';
import { MenuItem } from '@/types/MenuItem';
import { usePermissions } from '../auth/usePermissions';
import { DownloadIcon } from '@/components/icons/DownloadIcon';

interface Props {
  onDelete: () => void;
  onDownload: () => void;
}

export function useFileMenuItems({ onDelete, onDownload }: Props): MenuItem[] {
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

  if (permissions?.canDeleteCase) {
    items.push({
      label: 'Download',
      Icon: DownloadIcon,
      visible: permissions.canDeleteCase,
      action: onDownload,
    });
  }

  return items;
}
