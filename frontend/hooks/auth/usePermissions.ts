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
    },

    lawyer: {
      canDeleteCase: true,
      canUpdateCase: true,
      canSeeDeadlines: true,
    },

    client: {
      canDeleteCase: false,
      canUpdateCase: false,
      canSeeDeadlines: false,
    },
  };

  return permittionsByRole[role];
}
