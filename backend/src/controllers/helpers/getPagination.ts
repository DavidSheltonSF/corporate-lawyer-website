import { BadRequestError } from '../../errors/presentation/BadRequestError';
import { PageParams } from '../../types/PageParams';

export function getPagination(query: { limit?: string; page?: string }): PageParams {
  const { limit = 4, page = 1 } = query;

  const numberLimit = Number(limit);
  const numberPage = Number(page);

  if (Number.isNaN(numberLimit || Number.isNaN(numberPage))) {
    throw new BadRequestError('Invalid pagination paramethers');
  }

  return {
    limit: numberLimit,
    page: numberPage,
  };
}
