import { getCases } from '@/services/cases/getCases';
import { GetCasesParams } from '@/services/cases/types';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useCases(userRole: string | null, params: GetCasesParams) {
  const { page, status, search, clientId } = params;

  return useInfiniteQuery({
    queryKey: ['cases', page, status, search, clientId],
    queryFn: ({ pageParam = 1 }) => getCases(userRole!, { ...params, page: pageParam }),
    getNextPageParam: (lastPage) => lastPage.meta.nextPage,
    initialPageParam: 1,
    staleTime: 1000 * 60,
    enabled: !!userRole,
  });
}
