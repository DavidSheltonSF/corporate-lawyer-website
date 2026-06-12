import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export function useUrlParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.replace(`${pathname}?${params.toString()}`);
  }

  function clearParams(keys: string[]) {
    const params = new URLSearchParams(searchParams);

    keys.map((key) => {
      params.delete(key);
    });

    router.replace(`${pathname}?${params.toString()}`);
  }
  return {
    searchParams,
    updateParam,
    clearParams,
  };
}
