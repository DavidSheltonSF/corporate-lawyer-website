import { UserPermissions } from '@/types/UserPermissions';
import { useUserRole } from './useUserRole';

export function usePermissions(): UserPermissions | null {
  const role = useUserRole();
  if (!role) {
    return null;
  }

  const permittionsByRole: Record<string, UserPermissions> = {
    admin: {
      canDeleteCase: false,
      canUpdateCase: false,
      canSeeDeadlines: true,
      canUploadFiles: true,
      canDeleteFiles: false,
      canRenameFiles: false,
      canDownloadFiles: false,
    },

    lawyer: {
      canDeleteCase: true,
      canUpdateCase: true,
      canSeeDeadlines: true,
      canUploadFiles: true,
      canDeleteFiles: true,
      canRenameFiles: true,
      canDownloadFiles: true,
    },

    client: {
      canDeleteCase: false,
      canUpdateCase: false,
      canSeeDeadlines: false,
      canUploadFiles: true,
      canDeleteFiles: true,
      canRenameFiles: true,
      canDownloadFiles: true,
    },
  };

  return permittionsByRole[role];
}
