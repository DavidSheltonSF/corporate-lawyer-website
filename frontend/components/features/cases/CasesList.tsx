'use client';
import { CaseCard } from './CaseCard/CaseCard';
import { WithId } from '@/types/WithId';
import { Activity, useState } from 'react';
import { CardSkeleton } from '../../ui/Card/CardSkeleton';
import { CaseWithRelations } from '@/types/CaseWithRelations';

interface Props {
  cases: WithId<CaseWithRelations>[];
  loading: boolean;
  loadCases: Function;
}

export function CasesList({ cases, loading, loadCases }: Props) {
  const [openedDropdownId, setOpenedDropdownId] = useState<string | null>(null);

  const renderCases = cases?.map((cas, index) => {
    return (
      <CaseCard
        key={index}
        isDropdownOpen={openedDropdownId === cas.id}
        closeDropdown={() => setOpenedDropdownId(null)}
        openDropdown={() => {
          setOpenedDropdownId(cas.id);
        }}
        caseData={cas}
      />
    );
  });

  const renderCaseSkeletons = Array.from({ length: 4 }).map((page, index) => {
    return <CardSkeleton key={index} />;
  });

  return (
    <div className="flex flex-col gap-[32px] mt-[88px] w-full">
      <Activity mode={!loading && (!cases || cases.length === 0) ? 'visible' : 'hidden'}>
        <h1 className="text-3xl">Nenhum caso encontrado</h1>
      </Activity>
      {loading ? renderCaseSkeletons : renderCases}
    </div>
  );
}
