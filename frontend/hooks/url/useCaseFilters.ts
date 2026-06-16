import { useUrlParams } from './useUrlParams';

export function useCaseFilters() {
  const { searchParams, updateParam, clearParams } = useUrlParams();

  const search = searchParams.get('search') ?? '';
  const clientId = searchParams.get('clientId') ?? '';
  const clientName = searchParams.get('clientName') ?? '';
  const status = searchParams.get('status') ?? '';

  function clearClientFilter() {
    clearParams(['clientId', 'clientName']);
  }

  return {
    search,
    clientId,
    clientName,
    status,
    setSearch: (value: string) => updateParam('search', value),
    setClientId: (value: string) => updateParam('clientId', value),
    setClientName: (value: string) => updateParam('clientName', value),
    setStatus: (value: string) => updateParam('status', value),
    clearClientFilter,
  };
}
