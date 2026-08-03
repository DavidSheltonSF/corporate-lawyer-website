import { Page } from '../../types/Page';
import { PageParams } from '../../types/PageParams';

export function createMockPage<T>(items: T[], pageParams: PageParams): Page<T> {
  const { limit, page } = pageParams;
  const totalItems = items.length;
  return {
    items,
    meta: {
      currentPage: page,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      nextPage: 2,
    },
  };
}
