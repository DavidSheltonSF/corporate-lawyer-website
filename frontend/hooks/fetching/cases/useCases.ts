import { getCases } from '@/services/cases/getCases';
import { GetCasesParams } from '@/services/cases/types';
import { useQuery } from '@tanstack/react-query';

export function useCases(userRole: string | null, params: GetCasesParams) {
  const { page, status, search, clientId } = params;

  return useQuery({
    queryKey: ['cases', page, status, search, clientId],
    queryFn: () => {
      return getCases(userRole!, params);
    },
    staleTime: 1000 * 60,
    enabled: !!userRole,
  });
}
