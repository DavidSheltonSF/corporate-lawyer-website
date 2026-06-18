import { getClients } from '@/services/users/getClients';
import { GetUsersParams } from '@/services/users/types';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useClients(params: Omit<GetUsersParams, 'page'>) {
  const { search, limit } = params;

  return useInfiniteQuery({
    queryKey: ['clients', search, limit,],
    queryFn: ({ pageParam = 1 }) => getClients({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => lastPage.meta.nextPage,
    initialPageParam: 1,
    staleTime: 1000 * 60,
  });
}
