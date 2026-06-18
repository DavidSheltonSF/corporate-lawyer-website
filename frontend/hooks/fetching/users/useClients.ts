import { getClients } from '@/services/users/getClients';
import { GetUsersParams } from '@/services/users/types';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useClients(params: GetUsersParams) {
  const { search, limit, page } = params;

  return useInfiniteQuery({
    queryKey: ['clients', search, limit, page],
    queryFn: ({ pageParam = 1 }) => getClients({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => lastPage.meta.nextPage,
    initialPageParam: 1,
    staleTime: 1000 * 60,
  });
}
