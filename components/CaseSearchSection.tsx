'use client';
import { useContext, useEffect, useRef, useState } from 'react';
import { CaseSearchBar } from './CaseSearchBar';
import { CasesList } from './CasesList';
import { UserDataContext } from '@/contexts/UserDataContext';
import { CaseQueryTypeEnum } from './CaseQueryTypeEnum';
import { getClientCases } from '@/lib/getClientCases';
import { CaseProps } from '@/types/CaseProps';
import { WithId } from '@/types/WIthId';
import { Pagination } from './Pagination';

export default function CaseSearchSection() {
  const [query, setQuery] = useState('');
  const [queryType, setQueryType] = useState<CaseQueryTypeEnum>(CaseQueryTypeEnum.num_processo);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [cases, setCases] = useState<WithId<CaseProps>[]>([]);
  const [casesLoading, setCasesLoading] = useState(false);

  async function loadCases(page: number) {
    setCasesLoading(true);
    setPageIndex(page);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const casesPagination = await getClientCases(userData.id, page, 4, {
      type: queryType,
      value: query,
    });
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

  const userData = context.userData;

  return (
    <section className="relative">
      <div className="flex flex-col">
        <CaseSearchBar
          handleClick={() => {
            loadCases(1);
          }}
          setQuery={setQuery}
          queryType={queryType}
          setQueryType={setQueryType}
        />
      </div>
      <CasesList loading={casesLoading} cases={cases} />
      <Pagination pageIndex={pageIndex} reloadByPageIndex={loadCases} totalPage={totalPage} />
    </section>
  );
}
