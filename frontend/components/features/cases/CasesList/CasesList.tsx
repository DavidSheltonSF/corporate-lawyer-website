'use client';
import { WithId } from '@/types/WithId';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { CasesListSkeleton } from './CasesListSkeleton';
import { CaseCard } from '../CaseCard/CaseCard';

interface Props {
  cases: WithId<CaseWithRelations>[];
  loadCases: () => void;
  onDelete: (caseId: string) => void;
}

CasesList.Skeleton = CasesListSkeleton;

export function CasesList({ cases, loadCases, onDelete }: Props) {

  const renderCases = cases?.map((cas, index) => {
    return (
      <CaseCard
        refetchCases={loadCases}
        deleteCase={onDelete}
        key={cas.id}
        caseData={cas}
      />
    );
  });

  return <div className="flex flex-col gap-[32px] mt-[88px] w-full">{renderCases}</div>;
}
