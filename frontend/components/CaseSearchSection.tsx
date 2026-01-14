'use client';
import { useContext, useEffect, useRef, useState } from 'react';
import { CaseSearchBar } from './CaseSearchBar';
import { CasesList } from './CasesList';
import { UserDataContext } from '@/contexts/UserDataContext';
import { fetchClientCases } from '@/services/fetchClientCases';
import { WithId } from '@/types/WithId';
import { Pagination } from './Pagination';
import { CaseWithLawyers } from '@/types/CaseWithLawyers';
import { CaseStatusEnum } from '@/types/CaseStatusEnum';
import { DropDownButton } from './DropdownButton';
import { CaseStatusLabel } from '@/lib/CaseStatusLabel';

export default function CaseSearchSection() {
  const [query, setQuery] = useState('');
  const [statusFilder, setStatusFilter] = useState<CaseStatusEnum | null>(null);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [cases, setCases] = useState<WithId<CaseWithLawyers>[]>([]);
  const [casesLoading, setCasesLoading] = useState(false);

  async function loadCases(page: number) {
    setCasesLoading(true);
    setPageIndex(page);
    const casesPagination = await fetchClientCases(
      {
        page,
        limit: 4,
        query,
        status: statusFilder || '',
      },
      ['client', 'lawyers']
    );

    const casesData = casesPagination.cases;
    setTotalPage(casesPagination.totalPages);

    setCases(casesData);
    setCasesLoading(false);
  }

  useEffect(() => {
    loadCases(1);
  }, []);

  const context = useContext(UserDataContext);
  if (!context) {
    return <div>User data not found</div>;
  }

  return (
    <section className="flex flex-col items-center relative size-full">
      <div className="flex flex-col lg:flex-row gap-[40px] size-full">
        <CaseSearchBar
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
