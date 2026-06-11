import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export function useCaseFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get('search') ?? '';
  const clientId = searchParams.get('clientId') ?? '';

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.replace(`${pathname}?${params.toString()}`);
  }

  return {
    search,
    clientId,
    setSearch: (value: string) => updateParam('search', value),
    setClientId: (value: string) => updateParam('clientId', value),
  };
}
