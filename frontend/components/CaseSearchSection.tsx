'use client';
import { useEffect, useState } from 'react';
import { SearchBar } from './SearchBar';
import { CasesList } from './CasesList';
import { getMyCases } from '@/services/cases/getMyCases';
import { WithId } from '@/types/WithId';
import { Pagination } from './Pagination';
import { CaseStatusEnum } from '@/types/CaseStatusEnum';
import { DropDownButton } from './DropdownButton';
import { CaseStatusLabel } from '@/lib/CaseStatusLabel';
import { CaseModal } from './modals/CaseModal';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { useAuthenticatedUserContext } from '@/hooks/useAuthenticatedUserContext';
import { MissingContextError } from '@/errors/MissingContextError';
import { UserRole } from '@/types/UserRole';
import { getCases } from '@/services/cases/getCases';

export default function CaseSearchSection() {
  const [query, setQuery] = useState('');
  const [statusFilder, setStatusFilter] = useState<CaseStatusEnum | null>(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [cases, setCases] = useState<WithId<CaseWithRelations>[]>([]);
  const [casesLoading, setCasesLoading] = useState(false);

  const authUserContext = useAuthenticatedUserContext();
  if (!authUserContext) {
    throw new MissingContextError('AuthenticatedUserContext');
  }

  const { userData } = authUserContext;

  async function loadCases() {
    setCasesLoading(true);
    let casesPage = null;

    switch (userData.role) {
      case UserRole.lawyer:
        casesPage = await getCases({
          page,
          limit: 4,
          query,
          status: statusFilder || '',
        });
        break;

      case UserRole.client:
        casesPage = await getMyCases({
          page,
          limit: 4,
          query,
          status: statusFilder || '',
        });
        break;

      default:
        break;
    }

    const casesData = casesPage?.data;
    setTotalPage(casesPage?.meta.totalPages || 0);

    setCases(casesData || []);
    setCasesLoading(false);
  }

  useEffect(() => {
    loadCases();
  }, [page, query]);

  return (
    <section className="flex flex-col items-center relative size-full">
      <div className="flex flex-col lg:flex-row gap-[40px] size-full">
        <SearchBar setQuery={setQuery} />
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
      <CasesList loadCases={loadCases} loading={casesLoading} cases={cases} />
      <Pagination page={page} setPage={setPage} totalPage={totalPage} />
    </section>
  );
}
