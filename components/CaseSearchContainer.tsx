'use client';
import { getClientCases } from '@/lib/getClientCases';
import { CaseCard } from './CaseCard';
import { UserProps } from '@/types/UserProps';
import { WithId } from '@/types/WIthId';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    async function loadCases() {
      const casesData = await getClientCases(userData.id);
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
  }, [query]);

  const renderCases = cases?.map((cas, index) => {
    return <CaseCard key={index} caseData={cas} />;
  });
  return (
    <div className="flex flex-col gap-[32px] mt-[88px] min-h-[50vh] w-full ">{renderCases}</div>
  );
}
