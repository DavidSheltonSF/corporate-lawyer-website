import { getFiles, GetFilesParams } from '@/services/cases/getFiles';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useFiles(params: Omit<GetFilesParams, 'page'>) {
  const { ownerId, limit } = params;

  return useInfiniteQuery({
    queryKey: ['files', ownerId, limit],
    queryFn: ({ pageParam = 1 }) => getFiles({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => lastPage.meta.nextPage,
    initialPageParam: 1,
    staleTime: 1000 * 60,
    select: (data) => ({
      items: data.pages.flatMap((page) => page.items),
      totalItems: data.pages[0].meta.totalItems,
    }),
  });
}
