'use client';
import { useEffect, useState } from 'react';
import { SearchBar } from './SearchBar';
import { CasesList } from './CasesList';
import { getMyCases } from '@/services/getMyCases';
import { WithId } from '@/types/WithId';
import { Pagination } from './Pagination';
import { CaseStatusEnum } from '@/types/CaseStatusEnum';
import { DropDownButton } from './DropdownButton';
import { CaseStatusLabel } from '@/lib/CaseStatusLabel';
import { CaseModal } from './modals/CaseModal';
import { CaseWithRelations } from '@/types/CaseWithRelations';

export default function CaseSearchSection() {
  const [query, setQuery] = useState('');
  const [statusFilder, setStatusFilter] = useState<CaseStatusEnum | null>(null);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [cases, setCases] = useState<WithId<CaseWithRelations>[]>([]);
  const [casesLoading, setCasesLoading] = useState(false);

  async function loadCases(page: number) {
    setCasesLoading(true);
    setPageIndex(page);
    const casesPagination = await getMyCases(
      {
        page,
        limit: 4,
        query,
        status: statusFilder || '',
      },
      ['client', 'lawyers']
    );

    const casesData = casesPagination.data;
    setTotalPage(casesPagination.meta.totalPages);

    setCases(casesData);
    setCasesLoading(false);
  }

  useEffect(() => {
    loadCases(1);
  }, []);

  return (
    <section className="flex flex-col items-center relative size-full">
      <CaseModal />
      <div className="flex flex-col lg:flex-row gap-[40px] size-full">
        <SearchBar
          handleClick={() => {
            loadCases(1);
          }}
          setQuery={setQuery}
        />
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
      <CasesList loading={casesLoading} cases={cases} />
      <Pagination pageIndex={pageIndex} reloadByPageIndex={loadCases} totalPage={totalPage} />
    </section>
  );
}
