'use client';
import { useEffect, useState } from 'react';
import { SearchBar } from '../../ui/Search/SearchBar';
import { CasesList } from './CasesList/CasesList';
import { getMyCases } from '@/services/cases/getMyCases';
import { WithId } from '@/types/WithId';
import { Pagination } from '../../Pagination';
import { CaseStatusLabel } from '@/lib/CaseStatusLabel';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { getCases } from '@/services/cases/getCases';
import { handleLogout } from '@/lib/handleLogout';
import { RequestState } from '@/types/RequestState';
import { Page } from '@/types/Page';
import { useUserRole } from '@/hooks/auth/useUserRole';
import { CasesFetcher } from '@/services/cases/types';
import { useCaseFilters } from '@/hooks/url/useCaseFilters';
import { SearchFilter } from './SearchFilter';
import { FilterTag } from '@/components/ui/FilterTag';

export default function CaseSearch() {
  const { search, setSearch, clientId, clearClientFilter, clientName } = useCaseFilters();
  const [searchText, setSearchText] = useState(search);
  const [status, setStatusFilter] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [requestState, setRequestState] = useState<RequestState<Page<WithId<CaseWithRelations>>>>({
    status: 'idle',
  });

  const userRole = useUserRole();

  async function fetchCases() {
    setRequestState({ status: 'loading' });
    if (!userRole) return;

    let casesFetcher: Record<string, CasesFetcher> = {
      admin: getCases,
      lawyer: getCases,
      client: getMyCases,
    };

    const response = await casesFetcher[userRole]({
      page,
      limit: 4,
      search,
      status: status || '',
      clientId,
    });

    if (!response.success) {
      const { message, code, details } = response;
      return setRequestState({
        status: 'error',
        message: message || 'Unespected error',
        code,
        details,
      });
    }

    const { data } = response;

    setRequestState({ status: 'ok', data: response.data });
    setPage(data?.meta.currentPage || 1);
    setTotalPage(data?.meta.totalPages || 1);
  }

  useEffect(() => {
    fetchCases();
  }, [page, userRole, search, clientId, status]);

  useEffect(() => {
    if (requestState?.status === 'error') {
      requestState.code === 'UNAUTHORIZED' && handleLogout();
    }
  }, [requestState]);

  return (
    <section className="flex flex-col items-center size-full">
      <div className="flex flex-col lg:flex-row gap-[40px] size-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearch(searchText);
          }}
        >
          <SearchBar value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        </form>
        <div className="flex flex-col md:flex-row gap-[24px] md:items-center">
          <SearchFilter
            label="Status"
            itemLabel={CaseStatusLabel}
            setSelectedValue={setStatusFilter}
            selectedValue={status}
          />

          {clientId && <FilterTag label={clientName} onClear={clearClientFilter} />}
        </div>
      </div>
      <CasesList loadCases={fetchCases} requestState={requestState} />
      <Pagination page={page} setPage={setPage} totalPage={totalPage} />
    </section>
  );
}
