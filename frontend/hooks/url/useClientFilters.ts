import { useUrlParams } from './useUrlParams';

export function useClientFilters() {
  const { searchParams, updateParam } = useUrlParams();

  const search = searchParams.get('search') ?? '';

  return {
    search,
    setSearch: (value: string) => updateParam('search', value),
  };
}
