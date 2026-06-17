'use client';
import { useState } from 'react';
import { SearchBar } from '../../ui/Search/SearchBar';
import { CasesList } from './CasesList/CasesList';
import { Pagination } from '../../Pagination';
import { CaseStatusLabel } from '@/lib/CaseStatusLabel';
import { useUserRole } from '@/hooks/auth/useUserRole';
import { useCaseFilters } from '@/hooks/url/useCaseFilters';
import { SearchFilter } from './SearchFilter';
import { FilterTag } from '@/components/ui/FilterTag';
import { useCases } from '@/hooks/fetching/cases/useCases';
import { useDeleteCase } from '@/hooks/fetching/cases/useDeleteCase';
import { useErrorModal } from '@/hooks/modals/useErrorModal';
import { useSuccessModal } from '@/hooks/modals/useSuccessModal';
import { useUpdateCase } from '@/hooks/fetching/cases/useUpdateCase';
import { useUpdateCaseModal } from '@/hooks/modals/useUpdateCaseModal';

export default function CaseSearch() {
  const { search, setSearch, clientId, clearClientFilter, clientName, status, setStatus } =
    useCaseFilters();
  const [searchText, setSearchText] = useState(search);
  const [page, setPage] = useState(1);
  const { openErrorModal } = useErrorModal();
  const { openSuccessModal } = useSuccessModal();
  const { openUpdateCaseModal } = useUpdateCaseModal();

  const userRole = useUserRole();
  const deleteCaseMutation = useDeleteCase();
  const updateCaseMutation = useUpdateCase();

  const { data, error, isLoading } = useCases(userRole, {
    page,
    status: status || '',
    search,
    clientId,
    limit: 4,
  });

  if (error || !data) {
    console.log(error);
    return null;
  }

  async function handleDeleteCase(caseId: string) {
    try {
      await deleteCaseMutation.mutateAsync(caseId);
      openSuccessModal('rocesso removido com sucesso');
    } catch (error: any) {
      console.log(error);
      openErrorModal(error.message);
    }
  }

  async function handleUpdateCase(caseId: string, data: Record<string, string>) {
    try {
      await updateCaseMutation.mutateAsync({ caseId, data });
      openSuccessModal('Processo atualizado com sucesso');
    } catch (error: any) {
      console.log(error);
      openErrorModal(error.message);
    }
  }

  function handleOpenUpdateModal(caseId: string) {
    openUpdateCaseModal(caseId, handleUpdateCase);
  }

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
            setSelectedValue={setStatus}
            selectedValue={status}
          />

          {clientId && <FilterTag label={clientName} onClear={clearClientFilter} />}
        </div>
      </div>
      {isLoading ? (
        <CasesList.Skeleton />
      ) : (
        <CasesList
          cases={data.items}
          onDelete={handleDeleteCase}
          openUpdateModal={handleOpenUpdateModal}
        />
      )}
      <Pagination page={page} setPage={setPage} totalPage={data.meta.totalPages} />
    </section>
  );
}
