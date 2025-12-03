'use client';
import { getClientCases } from '@/lib/getClientCases';
import { CaseCard } from './CaseCard';
import { UserProps } from '@/types/UserProps';
import { WithId } from '@/types/WIthId';
import { Activity, useEffect, useState } from 'react';
import { CaseProps } from '@/types/CaseProps';
import { CaseQueryTypeEnum } from './CaseQueryTypeEnum';
import { filterCasesByTitle } from '@/lib/filterCasesByTitle';
import { filterCasesByProcessNumber } from '@/lib/filterCasesByProcessNumber';

interface Props {
  query: string;
  queryType: CaseQueryTypeEnum;
  userData: WithId<UserProps>;
}

export function CaseSearchContainer({ query, queryType, userData }: Props) {
  const [cases, setCases] = useState<WithId<CaseProps>[] | null>(null);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    async function loadCases() {
      const casesPagination = await getClientCases(userData.id, pageIndex, 4);
      const casesData = casesPagination.data;
      setTotalPage(casesPagination.totalPages);
      let filteredData = null;
      switch (queryType) {
        case CaseQueryTypeEnum.num_processo:
          filteredData = filterCasesByProcessNumber(casesData, query);
          break;

        case CaseQueryTypeEnum.titulo:
          filteredData = filterCasesByTitle(casesData, query);
          break;

        default:
          break;
      }
      setCases(filteredData);
    }
    loadCases();
  }, [query, queryType, pageIndex]);

  const renderCases = cases?.map((cas, index) => {
    return <CaseCard key={index} caseData={cas} />;
  });
  return (
    <div className="relative flex flex-col gap-[32px] mt-[88px] h-[130vh] w-full">
      <Activity mode={!cases || cases.length === 0 ? 'visible' : 'hidden'}>
        <h1 className="text-3xl">Nenhum caso encontrado</h1>
      </Activity>
      {renderCases}
      <div className="flex justify-center border absolute bottom-[24px] left-[50%] translate-x-[-50%] w-[80%]">
        <div className="flex gap-[16px]">
          {Array.from({ length: totalPage }).map((page, index) => {
            return (
              <div
                className={`flex justify-center items-center text-2xl bg-color-primary text-color-white size-[56px] rounded-lg ${
                  pageIndex === index + 1 ? 'brightness-180' : ''
                }`}
                key={index}
                onClick={() => {
                  setPageIndex(index + 1);
                }}
              >
                {index + 1}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
