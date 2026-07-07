import { UserPermissions } from '@/types/UserPermissions';
import { useUserRole } from './useUserRole';

export function usePermissions(): UserPermissions | null {
  const role = useUserRole();
  if (!role) {
    return null;
  }

  const permittionsByRole: Record<string, UserPermissions> = {
    admin: {
      canDeleteClients: false,
      canUpdateClients: false,
      canDeleteCase: false,
      canUpdateCase: false,
      canSeeDeadlines: true,
      canUploadFiles: true,
      canDeleteFiles: false,
      canRenameFiles: false,
      canDownloadFiles: false,
    },

    lawyer: {
      canDeleteClients: true,
      canUpdateClients: true,
      canDeleteCase: true,
      canUpdateCase: true,
      canSeeDeadlines: true,
      canUploadFiles: true,
      canDeleteFiles: true,
      canRenameFiles: true,
      canDownloadFiles: true,
    },

    client: {
      canDeleteClients: false,
      canUpdateClients: false,
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
