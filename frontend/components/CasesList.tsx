'use client';
import { CaseCard } from './CaseCard';
import { WithId } from '@/types/WithId';
import { Activity, useState } from 'react';
import { CaseCardSkeleton } from './CaseCardSkeleton';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { CaseModal } from './modals/CaseModal';

interface Props {
  cases: WithId<CaseWithRelations>[];
  loading: boolean;
}

export function CasesList({ cases, loading }: Props) {
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [caseModalIsOpen, setCaseModalIsOpen] = useState(false);
  const renderCases = cases?.map((cas, index) => {
    return (
      <CaseCard
        setSelectedCaseId={setSelectedCaseId}
        openCaseModal={() => setCaseModalIsOpen(true)}
        key={index}
        caseData={cas}
      />
    );
  });

  const renderCaseSkeletons = Array.from({ length: 4 }).map((page, index) => {
    return <CaseCardSkeleton key={index} />;
  });
  return (
    <div className="flex flex-col gap-[32px] mt-[88px] w-full">
      <CaseModal
        selectedCaseId={selectedCaseId}
        isOpen={caseModalIsOpen}
        setIsOpen={setCaseModalIsOpen}
      />
      <Activity mode={!loading && (!cases || cases.length === 0) ? 'visible' : 'hidden'}>
        <h1 className="text-3xl">Nenhum caso encontrado</h1>
      </Activity>
      {loading ? renderCaseSkeletons : renderCases}
    </div>
  );
}
