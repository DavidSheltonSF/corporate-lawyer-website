import { getClients } from '@/services/users/getClients';
import { GetUsersParams } from '@/services/users/types';
import { useQuery } from '@tanstack/react-query';

export function useClients(params: GetUsersParams) {
  const { search, limit, page } = params;

  return useQuery({
    queryFn: () => getClients(params),
    queryKey: ['clients', search, limit, page],
    staleTime: 1000 * 60,
  });
}
