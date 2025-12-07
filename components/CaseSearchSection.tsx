'use client';
import { useContext, useEffect, useRef, useState } from 'react';
import { CaseSearchBar } from './CaseSearchBar';
import { CasesList } from './CasesList';
import { UserDataContext } from '@/contexts/UserDataContext';

import { fetchClientCases } from '@/services/fetchClientCases';
import { CaseProps } from '@/types/CaseProps';
import { WithId } from '@/types/WIthId';
import { Pagination } from './Pagination';
import { CaseSearchEnum } from './CaseSearchEnum';

export default function CaseSearchSection() {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<CaseSearchEnum>(CaseSearchEnum.num_processo);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [cases, setCases] = useState<WithId<CaseProps>[]>([]);
  const [casesLoading, setCasesLoading] = useState(false);

  async function loadCases(page: number) {
    setCasesLoading(true);
    setPageIndex(page);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    let casesPagination = null;

    switch (searchType) {
      case CaseSearchEnum.num_processo:
        casesPagination = await fetchClientCases(userData.id, {
          page,
          limit: 4,
          processNumber: query,
        });
        break;

      case CaseSearchEnum.titulo:
        casesPagination = await fetchClientCases(userData.id, {
          page,
          limit: 4,
          title: query,
        });
        break;
      default:
        throw new Error("Query should be 'Nº Processo', 'Título' OR 'Cpf/Cnpj'");
    }

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
          searchType={searchType}
          setSearchType={setSearchType}
        />
      </div>
      <CasesList loading={casesLoading} cases={cases} />
      <Pagination pageIndex={pageIndex} reloadByPageIndex={loadCases} totalPage={totalPage} />
    </section>
  );
}
