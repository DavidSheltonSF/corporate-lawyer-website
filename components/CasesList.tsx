'use client';
import { CaseCard } from './CaseCard';
import { WithId } from '@/types/WithId';
import { Activity } from 'react';
import { CaseProps } from '@/types/CaseProps';
import { CaseCardSkeleton } from './CaseCardSkeleton';

interface Props {
  cases: WithId<CaseProps>[];
  loading: boolean;
}

export function CasesList({ cases, loading }: Props) {
  const renderCases = cases?.map((cas, index) => {
    return <CaseCard key={index} caseData={cas} />;
  });

  const renderCaseSkeletons = Array.from({ length: 4 }).map((page, index) => {
    return <CaseCardSkeleton key={index} />;
  });
  return (
    <div className="flex flex-col gap-[32px] mt-[88px] h-[130vh] w-full">
      <Activity mode={!loading && (!cases || cases.length === 0) ? 'visible' : 'hidden'}>
        <h1 className="text-3xl">Nenhum caso encontrado</h1>
      </Activity>
      {loading ? renderCaseSkeletons : renderCases}
    </div>
  );
}
