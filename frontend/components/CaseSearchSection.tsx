'use client';
import { useContext, useEffect, useRef, useState } from 'react';
import { CaseSearchBar } from './CaseSearchBar';
import { CasesList } from './CasesList';
import { UserDataContext } from '@/contexts/UserDataContext';
import { fetchClientCases } from '@/services/fetchClientCases';
import { WithId } from '@/types/WithId';
import { Pagination } from './Pagination';
import { CaseSearchEnum } from '../types/CaseSearchEnum';
import { CaseWithLawyers } from '@/types/CaseWithLawyers';
import { CaseStatusEnum } from '@/types/CaseStatusEnum';
import { DropDownButton } from './DropdownButton';
import { reduceString } from '@/lib/reduceString';

export default function CaseSearchSection() {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<CaseSearchEnum>(CaseSearchEnum.num_processo);
  const [statusFilder, setStatusFilter] = useState<CaseStatusEnum | null>(null);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [cases, setCases] = useState<WithId<CaseWithLawyers>[]>([]);
  const [casesLoading, setCasesLoading] = useState(false);

  async function loadCases(page: number) {
    setCasesLoading(true);
    setPageIndex(page);
    let casesPagination = null;

    switch (searchType) {
      case CaseSearchEnum.num_processo:
        casesPagination = await fetchClientCases(
          userData.id,
          {
            page,
            limit: 4,
            processNumber: query,
            status: statusFilder || '',
          },
          ['client', 'lawyers']
        );
        break;

      case CaseSearchEnum.titulo:
        casesPagination = await fetchClientCases(
          userData.id,
          {
            page,
            limit: 4,
            title: query,
            status: statusFilder || '',
          },
          ['client', 'lawyers']
        );
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
      <div className="flex gap-[40px]">
        <CaseSearchBar
          handleClick={() => {
            loadCases(1);
          }}
          setQuery={setQuery}
          searchType={searchType}
          setSearchType={setSearchType}
        />
        <div className="h-[48px] rounded-full w-[180px] z-80">
          <DropDownButton
            selectedItem={reduceString(statusFilder || '', 10)}
            defaultValue="Status"
            setSelectedItem={setStatusFilter}
            listItems={Object.values(CaseStatusEnum)}
          />
        </div>
      </div>
      <CasesList loading={casesLoading} cases={cases} />
      <Pagination pageIndex={pageIndex} reloadByPageIndex={loadCases} totalPage={totalPage} />
    </section>
  );
}
