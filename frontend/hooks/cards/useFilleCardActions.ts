import { DeleteIcon } from '@/components/icons/DeleteIcon';
import { MenuItem } from '@/types/MenuItem';
import { usePermissions } from '../auth/usePermissions';
import { DownloadIcon } from '@/components/icons/DownloadIcon';

interface Props {
  onDelete: () => void;
  onDownload: () => void;
}

export function useFileCardActions({ onDelete, onDownload }: Props): MenuItem[] | null {
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
    {
      label: 'Download',
      Icon: DownloadIcon,
      visible: permissions.canDeleteCase,
      action: onDownload,
    },
  ].filter((action) => action.visible);
}
