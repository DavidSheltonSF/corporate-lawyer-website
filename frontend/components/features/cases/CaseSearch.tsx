'use client';
import { useEffect, useState } from 'react';
import { SearchBar } from '../../ui/Search/SearchBar';
import { CasesList } from './CasesList';
import { getMyCases } from '@/services/cases/getMyCases';
import { WithId } from '@/types/WithId';
import { Pagination } from '../../Pagination';
import { CaseStatusEnum } from '@/types/CaseStatusEnum';
import { DropDownButton } from '../../DropdownButton';
import { CaseStatusLabel } from '@/lib/CaseStatusLabel';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { useAuthenticatedUserContext } from '@/hooks/useAuthenticatedUserContext';
import { MissingContextError } from '@/errors/MissingContextError';
import { UserRole } from '@/types/UserRole';
import { getCases } from '@/services/cases/getCases';
import { handleLogout } from '@/lib/handleLogout';
import { RequestState } from '@/types/RequestState';
import { Page } from '@/types/Page';

export default function CaseSearch() {
  const [query, setQuery] = useState('');
  const [statusFilder, setStatusFilter] = useState<CaseStatusEnum | null>(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [requestState, setRequestState] = useState<RequestState<Page<WithId<CaseWithRelations>>>>({
    status: 'idle',
  });

  const authUserContext = useAuthenticatedUserContext();
  if (!authUserContext) {
    throw new MissingContextError('AuthenticatedUserContext');
  }

  const { userData } = authUserContext;

  async function fetchCases() {
    try {
      setRequestState({ status: 'loading' });
      let response = null;

      switch (userData.role) {
        case UserRole.lawyer:
          response = await getCases({
            page,
            limit: 4,
            query,
            status: statusFilder || '',
          });
          break;

        case UserRole.client:
          response = await getMyCases({
            page,
            limit: 4,
            query,
            status: statusFilder || '',
          });
          break;
      }

      if (!response) {
        throw new Error('Invalid role');
      }

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
    } catch (error: any) {
      console.log(error);
      handleLogout();
    }
  }

  useEffect(() => {
    fetchCases();
  }, [page]);

   useEffect(() => {
     if (requestState?.status === 'error') {
       requestState.code === 'UNAUTHORIZED' && handleLogout();
     }
   }, [requestState]);

  return (
    <section className="flex flex-col items-center size-full">
      <div className="flex flex-col lg:flex-row gap-[40px] size-full">
        <SearchBar query={query} setQuery={setQuery} action={fetchCases} />
        <div className="h-[48px] rounded-full w-[180px]">
          <DropDownButton
            selectedItem={statusFilder}
            defaultValue="Status"
            setSelectedItem={setStatusFilter}
            itemLabel={(status: CaseStatusEnum) => CaseStatusLabel[status]}
            listItems={Object.values(CaseStatusEnum)}
          />
        </div>
      </div>
      <CasesList loadCases={fetchCases} requestState={requestState} />
      <Pagination page={page} setPage={setPage} totalPage={totalPage} />
    </section>
  );
}
