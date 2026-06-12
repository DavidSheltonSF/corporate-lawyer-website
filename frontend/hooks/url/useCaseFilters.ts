import { useUrlParams } from './useUrlParams';

export function useCaseFilters() {
  const { searchParams, updateParam } = useUrlParams();

  const search = searchParams.get('search') ?? '';
  const clientId = searchParams.get('clientId') ?? '';

  return {
    search,
    clientId,
    setSearch: (value: string) => updateParam('search', value),
    setClientId: (value: string) => updateParam('clientId', value),
  };
}
